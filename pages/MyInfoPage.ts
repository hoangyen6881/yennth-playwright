// private final By avatarWrapper = By.cssSelector(".orangehrm-edit-employee-image-wrapper");
// private  final By uploadBtn = By.cssSelector("button.employee-image-action");
// private final By fileInput = By.cssSelector("input[type='file']");
import {Page, Locator}  from '@playwright/test'
import path, { join } from 'node:path';
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export class MyInfoPage{
    readonly page: Page;
    // locators
    readonly avatarWrapper: Locator;
    readonly uploadBtn: Locator;
    readonly fileInput: Locator;

    constructor(page: Page){
        this.page = page;
        this.avatarWrapper = page.locator(".orangehrm-edit-employee-image-wrapper");
        this.uploadBtn = page.locator("button.employee-image-action");
        this.fileInput = page.locator("input[type='file']");

    }

    async uploadAvatar(): Promise<void>{
        await this.avatarWrapper.waitFor({state: 'visible', timeout: 5000});
        await this.avatarWrapper.click();
        await this.page.waitForTimeout(2000);

        // click upload button
        await this.uploadBtn.waitFor({state: 'visible', timeout: 5000});
        await this.uploadBtn.click();


        // chọn hình và upload hình
        await this.fileInput.waitFor({state: 'attached', timeout: 10000});
        const filePath = join(__dirname, "..", "data", "testing09.png");
        await this.fileInput.setInputFiles(filePath);
        await this.page.waitForTimeout(5000);

    }


}