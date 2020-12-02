const { Builder, By } = require('selenium-webdriver')

// Note : be sure to have the browser and geckoDriver in your PATH

describe('Selenium Login Tests', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('firefox').build(); // can be switched to any browser on your PATH var
    await driver.get("http://localhost:3000/"); // assumes server and client are active
  }, 10000);

  afterEach(async () => {
    await driver.close();
  }, 10000);

  it('Login Success', async () => {
    // set the window size
    await driver.manage().window().setRect(1750, 1000);

    // find email field, click and enter arbitrary email
    await driver.findElement(By.name("email")).click();
    await driver.findElement(By.name("email")).sendKeys("test@test.com");

    // click login button
    await driver.findElement(By.tagName("button")).click(); // login button

    // attempt to find logout button
    const button = await driver.findElement(By.tagName("button"));
    const buttonAttr = await button.getAttribute("data-testid");

    // expect an existing logout button (indicates we are logged in)
    expect(buttonAttr).toEqual("logout-button");

  }, 10000);
});
