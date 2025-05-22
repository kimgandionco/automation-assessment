class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameField = '#username';
      this.passwordField = '#password';
      this.submitButton = '#submit';
    }
  
    async goto() {
      await this.page.goto('https://practicetestautomation.com/practice-test-login/');
    }
  
    async login(username, password) {
      await this.page.fill(this.usernameField, username);
      await this.page.fill(this.passwordField, password);
      await this.page.click(this.submitButton);
    }
  
    async assertLoginSuccess() {
      await this.page.waitForURL('https://practicetestautomation.com/logged-in-successfully/');
      await this.page.waitForSelector('text=Congratulations student');
    }
  }
  
module.exports = { LoginPage };
  