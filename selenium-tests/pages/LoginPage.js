const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;

        this.usernameInput = By.id('username');
        this.passwordInput = By.id('password');
        this.loginBtn = By.id('submit');
    }

    async goToApp() {
        await this.driver.get('https://todolist.com/');
    }
    
    async login(username, password) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginBtn).click();
      }
    
    async waitForSuccessNavigateUrl(expectedUrl) {
        await this.driver.wait(until.urlIs(expectedUrl), 10000);
    }
}

module.exports = LoginPage;