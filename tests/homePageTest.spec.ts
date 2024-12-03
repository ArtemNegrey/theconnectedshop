import {expect, test} from '@playwright/test';
import { link } from 'fs';

test.describe('check home page elements', async () => {

test.beforeEach(async({page})=> {

    await page.goto('https://theconnectedshop.com/');

})

test('check title and url', async({page})=> {

    await expect(page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');

    await expect(page).toHaveURL('https://theconnectedshop.com/');

})

test('check logo elemenets', async({page})=> {

    const logoContainer = await page.locator('.Header__LogoLink');

    await expect(logoContainer).toBeVisible();
    await expect(logoContainer).toHaveAttribute('href', '/');
    
    const primaryLogo = await page.locator('img.Header__LogoImage--primary');

    await expect(primaryLogo).toBeVisible();
    await expect(primaryLogo).toHaveAttribute('src', '//theconnectedshop.com/cdn/shop/files/The_Connected_Shop_250x.png?v=1705959137');
    await expect(primaryLogo).toHaveAttribute('srcset', '//theconnectedshop.com/cdn/shop/files/The_Connected_Shop_250x.png?v=1705959137 1x, //theconnectedshop.com/cdn/shop/files/The_Connected_Shop_250x@2x.png?v=1705959137 2x');
    await expect(primaryLogo).toHaveAttribute('alt', 'The Connected Shop Logo');

    const transparentLogo = await page.locator('img.Header__LogoImage--transparent');

    await expect(transparentLogo).toBeTruthy();
    await expect(transparentLogo).toBeVisible();
    await expect(transparentLogo).toHaveAttribute('src', '//theconnectedshop.com/cdn/shop/files/The_Connected_Shop_logo_250x.png?v=1705959163');
    await expect(transparentLogo).toHaveAttribute('srcset', '//theconnectedshop.com/cdn/shop/files/The_Connected_Shop_logo_250x.png?v=1705959163 1x, //theconnectedshop.com/cdn/shop/files/The_Connected_Shop_logo_250x@2x.png?v=1705959163 2x');
    await expect(transparentLogo).toHaveAttribute('alt', 'The Connected Shop Logo White');
    await primaryLogo.hover();
    await expect(transparentLogo).toBeVisible();

    const countLazy = await page.locator ('img.Header__LogoImage');

    const lazy = await countLazy.count ();
    for (let i = 0; i < lazy; i++) {
        await expect(countLazy.nth(i)).toHaveAttribute('loading', 'lazy');
    }

    // homework
    const countWidth = await page.locator ('img.Header__LogoImage');

    const width = await countWidth.count ();
    for (let i = 0; i < width; i++) {
        await expect(countWidth.nth(i)).toHaveAttribute('width', '250');
    }

    const countHeight = await page.locator ('img.Header__LogoImage');

    const height = await countHeight.count ();
    for (let i = 0; i < height; i++) {
        await expect(countHeight.nth(i)).toHaveAttribute('height', '75px');
    }

})

test('check secondary navigation', async({page})=> {

    const secondaryNavigationList = await page.locator('ul.HorizontalList.HorizontalList--spacingLoose.hidden-pocket.hidden-lap');
    await expect(secondaryNavigationList).toBeVisible();

    const secondaryNavigationListAccount = page.getByRole('link').filter({hasText: 'Account'});

    await expect (secondaryNavigationListAccount).toBeVisible();
    await expect (secondaryNavigationListAccount).toHaveAttribute('href', '/account');

    const secondaryNavigationListSearch = page.getByRole('link').filter({hasText: 'Search'}).nth(0);

    await expect (secondaryNavigationListSearch).toBeVisible();
    await expect (secondaryNavigationListSearch).toHaveAttribute('href', '/search');
    await expect (secondaryNavigationListSearch).toHaveAttribute('data-action', 'toggle-search');

    const secondaryNavigationListCart = page.getByRole('link').filter({hasText: 'Cart ('});

    await expect (secondaryNavigationListCart).toBeVisible();
    await expect (secondaryNavigationListCart).toHaveAttribute('href', '/cart');
    await expect (secondaryNavigationListCart).toHaveAttribute('data-action', 'open-drawer');
    await expect (secondaryNavigationListCart).toHaveAttribute('data-drawer-id', 'sidebar-cart');
    await expect (secondaryNavigationListCart).toHaveAttribute('aria-label', 'Open cart');

})

})