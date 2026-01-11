// B1: Highlight element trên trang web
// B2: chụp ảnh màn hình và lưu vào file
// Nhận các tham số:
// param1: page -> object Page của playwright
// param2: locator -> object Locator của playwright
// param3: testName -> dùng để đặt folder lưu hình có highlight
// param4: stepName -> dùng để đặt tên file hình

import { Locator, Page } from "@playwright/test";
import { mkdir, mkdirSync } from "node:fs";
import path, { join } from "node:path";
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function highLightAndScreenshot(
    page: Page,
    locator: Locator,
    testName: string,
    stepName: string
): Promise<void> {
    // B1: Tạo tên folder
    const folderName = testName.toLocaleLowerCase()

    // B2: Tạo đường dẫn để lưu folder
    // __dirname: thư mục (folder) chứa file code
    // ..: quay lên thư mục cha
    const screenshotDir = join(__dirname, "..", "screenshots", folderName);

    // B3: Tạo folder
    mkdirSync(screenshotDir, { recursive: true});
    // B4: highlight element
    
    await locator.evaluate((el) => {
        (el as HTMLElement).style.border = '4px solid red';
        (el as HTMLElement).style.backgroundColor = 'yellow';

    })
    await page.waitForTimeout(2000);
    // B5: chụp màn hình và lưu vào file
    const filePath = join(screenshotDir, `${stepName}.png`);
    await page.screenshot({ path: filePath});
    // Trả lại trạng thái ban đầu của element
    await locator.evaluate((el) => {
        (el as HTMLElement).style.border = '';
        (el as HTMLElement).style.backgroundColor = ''; 
    })
}
