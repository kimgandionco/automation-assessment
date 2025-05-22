# Kim Gandionco - Automation Assessment - Selenium & Playwright

This repository contains automation test scripts using **Selenium WebDriver** and **Playwright** to meet the requirements outlined in the technical assessment.

---

## 📌 Assumptions

### Selenium
- The ToDo web application described in the test scenario does not exist or was not provided.
- Therefore, I used imaginary web app and simulated elements in said web app for:
  - Adding a task
  - Deleting a task
  - Verifying task existence

### Playwright
- Since the requirement was only to demonstrate a **web navigation and login workflow**, I selected a well-known public site with a working login page:
  - [Practice Test Automation Login](https://practicetestautomation.com/practice-test-login/)

---

## 🧰 Tools & Features Used

| Feature                        | Selenium | Playwright |
|-------------------------------|----------|------------|
| Page Object Model (POM)       | ✅        | ✅          |
| Data-Driven (JSON)            | ✅        | ✅ (basic)  |
| Shared Utility (`appendTimestamp`) | ✅    | ✅          |
| Screenshot on failure         | ✅        | (Not needed) |
| Mocha test runner             | ✅        | N/A         |
| Headed / Headless mode        | ❌        | ✅          |

---

## 🧪 Test Summary

### ✅ Selenium

Tests in `selenium-tests/tests/`:

-`login.test.js` - logs in the todo app with username and password
- `add-delete-workflow.test.js` – adds and deletes each item in json
- Screenshots saved on test failure
- POM files:
  - `LoginPage.js`
  - `ToDoPage.js`

### ✅ Playwright

Tests in `playwright-tests/tests/`:

- `login.spec.js` – positive login using POM and negative login using timestapped username
- Uses `appendTimestamp()` from shared `utils/`

> 🔁 Run in either **headed** (UI visible) or **headless** mode:

```bash
npx playwright test tests/login.spec.js --headed
