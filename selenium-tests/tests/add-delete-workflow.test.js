const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const ToDoPage = require('../pages/ToDoPage');
const creds = require('../credentials/creds.json');
const todoData = require('../test-data/todoItems.json');
const { appendTimestamp } = require('../../utils/stringUtil');
const fs = require('fs');

let driver;
let loginPage;
let todoPage;

describe('Add Delete task Workflow Tests', function () {
    this.timeout(30000);
  
    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
        todoPage = new todoPage(driver);
    
        console.log('Logging in...');
        await loginPage.goToApp();
        await loginPage.login(creds.username, creds.password);
        await loginPage.waitForSuccessNavigateUrl('https://tasklist.com/home/');
        await todoPage.wait(until.elementLocated(titleHeader), 5000);
    });
  
    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
                const screenshot = await driver.takeScreenshot();
                const filename = this.currentTest.title() + '.png';
                fs.writeFileSync(`${this.currentTest.title}.png`, screenshot, 'base64');
        }
        await driver.quit();
    });
  
    // Dynamically create a test for each item in the JSON
    todoData.tasks.forEach((task) => {
        const uniqueTask = appendTimestamp(task);
        it(`should add task: "${uniqueTask}"`, async () => {
            await todoPage.addTodo(task);
            const added = await todoPage.itemExists(uniqueTask);
            if(!added) {
                throw new Error(`Task "${uniqueTask}" was not added`);
            }
            console.log(`Added ${uniqueTask}`);
        });
    
        it(`should delete task: "${uniqueTask}"`, async () => {
            
            await todoPage.deleteTodo(uniqueTask);
            const deleted = !(await todoPage.itemExists(uniqueTask));
            if(!deleted) {
                throw new Error(`Task "${uniqueTask}" was not deleted`);
            }
            console.log(`Deleted ${uniqueTask}`);
        });
    });
});