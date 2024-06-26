import { test, expect } from '@playwright/test';

const pageURL = "https://qavalidation.com/demo-form/";

test('has title', async ({ page }) => {
  await page.goto(pageURL);
  await expect(page).toHaveTitle(/Demo form - qavalidation/);
});

test('fill form correctly', async ({ page }) => {
  await page.goto(pageURL);
  await page.fill('//input[@id="g4072-fullname"]', 'John Doe');
  await page.fill('//input[@id="g4072-email"]' , 'lanka@thegmail.com');
  await page.fill('//input[@id="g4072-phonenumber"]' , '076943567');
  await page.selectOption('//select[@id="g4072-gender"]', 'Female');
  await page.locator('//input[@id="g4072-yearsofexperience-1"]').check();
  //await page.locator('//legend[normalize-space()="Skills"]').selectOption(['//input[@id="g4072-skills-Functional testing"]' , '//input[@id="g4072-skills-Automation testing"]']);

 //single checkbox
 await page.locator('//input[@id="g4072-skills-Functional testing"]').check(); // put the tick on checkbox
 expect(await page.locator('//input[@id="g4072-skills-Functional testing"]')).toBeChecked() // this is the assertion for check wether checkbox is already checked or not.
  
//multiple checkboxes
  const checkboxesLocators = [
    "//input[@id='g4072-skills-Functional testing']" ,
    "//input[@id='g4072-skills-Automation testing']" ,
    "//input[@id='g4072-skills-API testing']"
  ];

  for(const locator of checkboxesLocators){    //select multiple checkboxes
    await page.locator(locator).check();
  }

  await page.waitForTimeout(5000);

  for(const locator of checkboxesLocators){    //unselect multiple checkboxes which are already select
    if(await page.locator(locator).isChecked())
    await page.locator(locator).uncheck();
  }

  await page.selectOption('//label[normalize-space()="QA Tools"]', 'Selenium');
  await page.locator('//textarea[@id="contact-form-comment-g4072-otherdetails"]').fill('I am Lanka Prasadini');
  await page.locator('//button[normalize-space()="Submit!"]').click();
  //await page.waitForNavigation({ waitUntil: 'networkidle' });
  await expect(page.locator('h4#contact-form-success-header')).toBeVisible();
});

test('search function', async ({ page }) => {
  await page.goto(pageURL);
const searchInputSelector = '//input[@id="the7-search"]';
  await page.fill(searchInputSelector, 'email');
  await page.getByText('Submit').press('Enter');
  await page.goto('https://qavalidation.com/?s=email');
});