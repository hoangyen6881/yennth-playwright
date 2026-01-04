import {expect, test} from "@playwright/test";
import { LoginData, readFileFromCsv } from "../utils/csvReader";
import { read } from "node:fs";
import { LoginPage } from "../pages/LoginPage";
import { log } from "node:console";

// doc file csv
const testData: LoginData[] = readFileFromCsv();
console.log(`Đã load ${testData.length} dòng dữ liệu từ file CSV.`);

test.describe("Login Data from CSV", () => {
      for(let data of testData) {
        test(`${data.description}`, async ({page}) => {
            const loginPage = new LoginPage(page)
            await loginPage.login(data.username, data.password)
            const isSuccess = await loginPage.isLoginSuccessfull()
            if (data.expected_result === "success") {
                expect(isSuccess).toBe(true)
            } else {
                expect(isSuccess).toBe(false)
            }
        })
    }

});