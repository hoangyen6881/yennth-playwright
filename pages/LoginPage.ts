import {Page, Locator}  from '@playwright/test'
import { highLightAndScreenshot } from '../utils/screenshot';

export class LoginPage{
    // locator
    readonly page: Page; // Page object giup truong tac voi trang web
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly homeTitle: Locator | undefined;
    // function: login, validate
    constructor (page: Page){
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async login(username: string, password: string): Promise<void>{
        // đợi vài giây để load trang
        await this.page.waitForTimeout(2000);

        // B1: navigate vao web page login
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login?fbclid=IwY2xjawPFrxNleHRuA2FlbQIxMABicmlkETFwbUV1S0hWVDB3VGRDQkNnc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHuMDTez0xTIalHoOBhQwXbIEtxn8xAlEXElQbjIL2tq1TtRTNAsqHrcm962N_aem_PF8igNuHgU37yjJLb0U7nw");
        // B2:fill user name
        
        await this.usernameInput.fill(username);
        await highLightAndScreenshot(this.page, this.usernameInput, 'LoginTest', 'filled-username');
        // B3:fill password vao input
        await this.passwordInput.fill(password);
        await highLightAndScreenshot(this.page, this.passwordInput, 'LoginTest', 'filled-password');
        // b4: enter nut login
        await highLightAndScreenshot(this.page, this.loginButton, 'LoginTest', 'clicked-login-button');
        await this.loginButton.click()

    }

    async isLoginSuccessfull(): Promise<boolean>{
        // case1: test url cos chu dashboard
        let url = this.page.url();
        return url.includes("dashboard");

    }
}
