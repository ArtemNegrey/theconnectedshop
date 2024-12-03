import {expect, test} from '@playwright/test';
import { link } from 'fs';

test.describe('check search', async () => {

    const checkExistProduct = 'input.Search__Input';
    const existProduct = "Smart Light Switch";
    const nonExistentProduct = 'testtesttest' ;

test.beforeEach(async({page})=> {

    // перевірка відкриття головної сторінки

    await page.goto('https://theconnectedshop.com/');

    // перевірка існування пошуку в нав барі та його атрибуту

    const checkSearchOpening = await page.locator('[data-action="toggle-search"]').first();

    await expect(checkSearchOpening).toBeVisible();
    await expect(checkSearchOpening).toHaveAttribute('class', 'Heading Link Link--primary Text--subdued u-h8');

    // перевірка відкриття пошуку та його відображення
    
    await checkSearchOpening.click();
    await expect (page.locator(checkExistProduct)).toBeVisible();

    // перевірка атрибуту пошуку
    await expect (page.locator(checkExistProduct)).toHaveAttribute('placeholder','Search...')

})

test.afterEach(async({page})=>{

    await page.close();

})

// тест на перевірку існуючого продукту

test('search exsist product', async({page})=>{

    await page.locator(checkExistProduct).fill(existProduct);
    await expect (page.locator(checkExistProduct)).toHaveValue(existProduct);

    const existProductSuccess = page.getByRole('link').filter({hasText: 'Smart Light Switch'}).nth(0);

    await expect (existProductSuccess).toHaveText(existProduct);

    const hrefValue = await existProductSuccess.getAttribute('href');

    expect(hrefValue).toMatch(/\/products\/smart-light-switch\?_pos=1&_sid=\w+&_ss=r/);
   

})

// тест на перевірку не існуючого продукту

test('search nonexsistent product', async({page})=>{

    await page.locator(checkExistProduct).fill(nonExistentProduct);
    await expect (page.locator(checkExistProduct)).toHaveValue(nonExistentProduct);

    const checkNonExistProduct = await page.locator('div.Segment__Content').first();

    await expect (checkNonExistProduct).toHaveText('No results could be found');

})

})