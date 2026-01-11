import {test, expect} from "@playwright/test";

test.describe("API test-expect", ()=>{
    test("API Get list movie", async ({page})=>{
        const response =  page.request.get(
            "https://movies-api-sample.herokuapp.com/api/movies",
            {
                headers: {
                    TokenCybersoft:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJUZXN0aW5nIDA5IiwiSGV0SGFuU3RyaW5nIjoiMTcvMDYvMjAyNiIsIkhldEhhblRpbWUiOiIxNzgxNjU0NDAwMDAwIiwibmJmIjoxNzU3NzgyODAwLCJleHAiOjE3ODE4MDIwMDB9.-_5VIe7kzZRPNtHEjW0NXKsmWqPh8yyd-pUQ9bQfMrM"
                }
            }
        );
        expect((await response).status()).toBe(200);

        // verify response body
        // convert string data to json
        const responseBody =  await (await response).json();
        console.log(responseBody);
        expect(responseBody).toHaveProperty("statusCode")
        expect(responseBody).toHaveProperty("message")
        expect(responseBody).toHaveProperty("content")
        expect(responseBody).toHaveProperty("dataTime")

    })
})