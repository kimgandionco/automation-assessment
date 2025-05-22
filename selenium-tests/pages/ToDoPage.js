const { By, until } = require('selenium-webdriver');

class ToDoPage {
  constructor(driver) {
    this.driver = driver;

    this.titleHeader = By.xpath("//*[contains(text(), 'My To Do List')]");
    this.newToDoInput = By.className('new-todo');
    this.toDoList = By.css('.todo-list');
  }

  async addTodo(taskText) {
    const input = await this.driver.findElement(this.newToDoInput);
    await input.sendKeys(taskText, '\n');
    await this.driver.wait(until.elementLocated(By.xpath(`//label[text()='${taskText}']`)), 5000);
  }

  async itemExists(taskText) {
    const items = await this.driver.findElements(By.xpath(`//label[text()='${taskText}']`));
    return items.length > 0;
  }

  async deleteTodo(taskText) {
    const label = await this.driver.findElement(By.xpath(`//label[text()='${taskText}']`));
    const parentLi = await label.findElement(By.xpath('./ancestor::li'));
    const deleteBtn = await parentLi.findElement(By.css('button.delete'));

    await this.driver.actions({ bridge: true }).move({ origin: parentLi }).perform();
    await deleteBtn.click();

    await this.driver.wait(async () => {
      return !(await this.itemExists(taskText));
    }, 3000);
  }

  async toggleTodo(taskText) {
    const label = await this.driver.findElement(By.xpath(`//label[text()='${taskText}']`));
    const parentLi = await label.findElement(By.xpath('./ancestor::li'));
    const checkbox = await parentLi.findElement(By.css('input.checkbox'));

    await checkbox.click();
  }

  async isItemChecked(taskText) {
    const label = await this.driver.findElement(By.xpath(`//label[text()='${taskText}']`));
    const parentLi = await label.findElement(By.xpath('./ancestor::li'));
    const checkbox = await parentLi.findElement(By.css('input.checkbox'));

    return await checkbox.isSelected();
  }

  
}

module.exports = ToDoPage;