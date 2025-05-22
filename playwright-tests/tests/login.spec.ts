import {test, expect} from '@playwright/test';
import creds from '../credentials/creds.json';
import { LoginPage } from '../pages/LogInPage';
import { appendTimestamp } from '../../utils/stringUtils';

test('Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(creds.username, creds.password);
  await loginPage.assertLoginSuccess();

  await expect(page.locator('text=Congratulations student')).toBeVisible();
});

test('Login with timestamped username (negative test)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const invalidUsername = appendTimestamp(creds.username);
  
    console.log('Trying invalid login with timestamped username:', invalidUsername);
  
    await loginPage.goto();
    await loginPage.login(invalidUsername, creds.password);
    await expect(page).not.toHaveURL(/.*logged-in-successfully/);
    await expect(page.locator('.show')).toHaveText('Your username is invalid!');
});
