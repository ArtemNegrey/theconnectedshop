import {expect, test} from '@playwright/test';
import { link } from 'fs';

test.describe('check home page elements', async () => {

    const contactUsForm = 'h1.SectionHeader__Heading.Heading.u-h1'

    const sendMessageBnt = 'button.Form__Submit.Button.Button--primary.Button--full'

    const confirmationAlert = 'p.Alert.Alert--success'

    const yourEmailField = '[aria-label="Your email"]';

test.beforeEach(async({page})=> {

    await page.goto('https://theconnectedshop.com/');

    await page.getByRole('link', { name: 'Contact Contact' }).click();


})

// перевірка на відображення форми 

test ('opening contact form', async ({page})=>{

    await expect (page.locator(contactUsForm)).toBeVisible();

})

// перевірка на відображення всіх елементів форми

test ('contact form content', async ({page})=>{

    await expect (page.getByPlaceholder('Your name')).toBeVisible();

    await expect (page.locator(yourEmailField)).toBeVisible();

    await expect (page.getByPlaceholder('Your phone')).toBeVisible();

    await expect (page.getByPlaceholder('Your message')).toBeVisible();

    await expect (page.locator(sendMessageBnt)).toBeVisible();
})

// перевірка на успішне відправлення форми

test ('contact form success', async ({page})=>{

    await page.locator('[aria-label="Your name"]').fill('Artem');

    await expect (page.locator('[aria-label="Your name"]')).toHaveValue('Artem');

    await page.locator('[aria-label="Your email"]').fill('test@gmail.com');

    await expect (page.locator('[aria-label="Your email"]')).toHaveValue('test@gmail.com');

    await page.locator('[aria-label="Your phone"]').fill('0686868686');

    await expect (page.locator('[aria-label="Your phone"]')).toHaveValue('0686868686');

    await page.locator('[aria-label="Your message"]').fill('test');

    await expect (page.locator('[aria-label="Your message"]')).toHaveValue('test');

    await expect (page.locator('button:text("Send message")')).toBeEnabled(); // перевірка на те що кнопка Відправити - активна.

    await page.locator('button:text("Send message")').click();

    await expect (page.locator(confirmationAlert)).toBeVisible(); // потрібно пофіксити проблему з капчею

})

test ('contact form failed', async ({page})=>{

    await page.locator('[aria-label="Your name"]').fill('Artem');

    await expect (page.locator('[aria-label="Your name"]')).toHaveValue('Artem');

    await page.locator('button:text("Send message")').click();

    const isInvalid = await page.locator(yourEmailField).evaluate((input: HTMLInputElement) => !input.checkValidity()); // перевірка браузерної валідаціїї

    expect(isInvalid).toBeTruthy(); // перевірка браузерної валідаціїї

})

})