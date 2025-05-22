const { Builder } = require('selenium-webdriver');
const creds = require('../credentials/creds.json');
const LoginPage = require('../pages/LoginPage.js');
const fs = require('fs');
const { log } = require('console');

(async function loginTest() {
    const driver = await new Builder().forBrowser('chrome').build();
    const loginPage = new LoginPage(driver);

    try {
        await loginPage.goToApp();
        await loginPage.login(creds.username, creds.password);
        await loginPage.waitForSuccessNavigateUrl('https://todolist.com/home/');
        console.log('Login Workflow passed')
    } catch (error) {
        console.error('Login Test failed:', error);
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync('login-error.png', screenshot, 'base64');
    } finally {
        await driver.quit();
    }
})();