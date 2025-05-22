const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;

        this.usernameInput = By.id('username');
        this.passwordInput = By.id('password');
        this.loginBtn = By.id('submit');
        
        async goToApp() {
            await this.driver.get('https://todolist.com/');
        }

    }
}