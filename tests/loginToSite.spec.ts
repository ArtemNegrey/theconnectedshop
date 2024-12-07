import {expect, test} from '@playwright/test';
import { link } from 'fs';

test.describe('check home page elements', async () => {

    const logInFormTitle = 'h2.ui-heading';

    const validationErrorMessageCode = 'span.validation-error__message';

test.beforeEach(async({page})=> {

    await page.goto('https://theconnectedshop.com/');

})

test ('open login form, enter email and enter code', async ({page})=>{

    const secondaryNavigationListAccount = page.getByRole('link').filter({hasText: 'Account'});

    await expect (secondaryNavigationListAccount).toBeVisible();

    await secondaryNavigationListAccount.click();

    await expect (page.locator(logInFormTitle)).toBeVisible();

    await expect (page.locator('button.ui-button.ui-button--primary.ui-button--full-width.h-captcha.ui-button--size-large.login-button.ui-button--has-hover-icon')).toBeDisabled();

    await page.locator('input.next-input.email-typo-input').fill('test@gmail.com');

    await expect (page.locator('input.next-input.email-typo-input')).toHaveValue('test@gmail.com');

    await page.locator('[aria-label="Close"]').click(); // закриття першої капчі

    await page.locator('button.ui-button.ui-button--primary.ui-button--full-width.h-captcha.ui-button--size-large.login-button.ui-button--has-hover-icon').click();

    await expect (page.locator(logInFormTitle)).toBeVisible();

    // після цього степу - друга капча яка блокує відображення кнопки Сабміт

    // await expect (page.locator('button.ui-button.ui-button--primary.ui-button--full-width.h-captcha.ui-button--size-large.captcha__submit')).toBeVisible();

    // await page.locator('button.ui-button.ui-button--primary.ui-button--full-width.h-captcha.ui-button--size-large.captcha__submit').click();

    // await expect (page.locator(validationErrorMessageCode)).toBeVisible();

})


})