import {test, expect, Page} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
test.describe("Home Page Tests", () => {
    // setup môi trường
    // login với account
    // goto vào page Home
    test.beforeEach( async ({page}) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        // Login
        await loginPage.login('Admin', 'admin123');
        // Đợi trang home xuất hiện
        // check url của trang home
        // **: không quan tâm giá trị là gì
        await page.waitForURL("**/dashboard**", {timeout: 10000});

        // đợi đến khi menu items xuất hiện
        await homePage.sidebarMenuItems.first().waitFor({state: 'visible', timeout: 10000});

    });

    test("Verify các menu trong sidebar", async ({page}) => {
        const homePage = new HomePage(page);    
        const menuItems = await homePage.getSidebarMenuItems();
        //kiểm tra
        // case1: menuItems >0
        expect(menuItems.length).toBeGreaterThan(0);

        // case2: menuItems có chứa các giá trị mong muốn không
        // Kiểm tra menu Admin có tồn tại trong menuItems không
        expect(menuItems).toContain("Admin");
        
        // case 3: kiểm tra menuItems có đầy đủ các giá trị mong muốn không 
    });
});