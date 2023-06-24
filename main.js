require("dotenv").config();
const puppeteer = require("puppeteer");

const { TWITTER_USERNAME, TWITTER_PASSWORD } = process.env;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getDateNow = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

try {
    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
        })
        const page = await browser.newPage()
        await page.setViewport({ width: 1280, height: 720 })
        await page.goto("https://twitter.com/i/flow/login")
        await page.waitForXPath("/html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div[5]/label/div/div[2]/div/input").then(async (e) => {
            await e.type(TWITTER_USERNAME, { delay: 100 })
        })
        await page.waitForXPath("/html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div[6]/div").then(async (e) => {
            await e.click()
        })
        await page.waitForXPath("/html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[3]/div/label/div/div[2]/div[1]/input").then(async (e) => {
            await e.type(TWITTER_PASSWORD, { delay: 100 })
        })
        await page.waitForXPath("/html/body/div/div/div/div[1]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div/div/div").then(async (e) => {
            e.click()
        })
        await page.waitForXPath("/html/body/div[1]/div/div/div[2]/header/div/div/div/div[1]/div[2]/nav/a[8]").then(async (e) => {
            await e.click()
        })
        sleep(1000)
        await page.waitForXPath("/html/body/div[1]/div/div/div[1]/div/div[2]/div/div/div/div[2]/div[1]/div").then(async (e) => {
            await e.click()
        })
        sleep(1000)
        for (let i = 8; i < 5000; i++) {
            console.log(`${getDateNow()} --> Started deleting ${i}th tweet`);
            await page.waitForXPath(`/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/div/section/div/div/div/div/div[${i}]/div/div/article/div/div/div[2]/div[2]/div[1]/div/div[2]/div/div/div/div/div`, {
                timeout: 0
            }).then(async (e) => {
                await e.click()
                console.log(`${getDateNow()} --> Clicked ${i}th tweet on infos button`);
            })
            await page.waitForXPath(`/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div[2]/div/div[3]/div/div/div/div[1]/div[2]/div`, {
                timeout: 0
            }).then(async (e) => {
                await e.click()
                console.log(`${getDateNow()} --> Clicked ${i}th tweet on delete button`);
            })
            await page.waitForXPath(`/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[1]/div`, {
                timeout: 0
            }).then(async (e) => {
                await e.click()
                console.log(`${getDateNow()} --> Clicked ${i}th tweet on confirm delete button`);
            })
        }
    })()
} catch (err) {
    console.error(err)
}