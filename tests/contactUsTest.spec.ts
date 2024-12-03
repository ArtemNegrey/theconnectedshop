import {expect, test} from '@playwright/test';
import { link } from 'fs';

test.describe('check home page elements', async () => {

    const contactUsForm = 'h1.SectionHeader__Heading.Heading.u-h1'

    const sendMessageBnt = 'button.Form__Submit.Button.Button--primary.Button--full'

    const confirmationAlert = 'p.Alert.Alert--success'

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

    const yourEmailField = await page.locator('[aria-label="Your email"]');

    await expect (yourEmailField).toBeVisible();

    await expect (page.getByPlaceholder('Your phone')).toBeVisible();

    await expect (page.getByPlaceholder('Your message')).toBeVisible();

    await expect (page.locator(sendMessageBnt)).toBeVisible();
})

// перевірка на іспішне відправлення форми

test ('contact form success', async ({page})=>{

    await page.locator('[aria-label="Your name"]').fill('Artem');

    await page.locator('[aria-label="Your email"]').fill('test@gmail.com');

    await page.locator('[aria-label="Your phone"]').fill('0686868686');

    await page.locator('[aria-label="Your message"]').fill('test');

    await page.locator('button:text("Send message")').click();

    await expect (page.locator(confirmationAlert)).toBeVisible(); // потрібно пофіксити проблему з капчею


})

})