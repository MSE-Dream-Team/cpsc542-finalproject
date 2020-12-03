const { Builder, By } = require("selenium-webdriver");

describe("Selenium Login Tests", () => {
  let driver;

  // open the browser and login before executing all tests
  beforeAll(async () => {
    driver = await new Builder().forBrowser("firefox").build(); // can be switched to any browser on your PATH var

    await driver.get("http://localhost:3000/"); // assumes server and client are active

    // set window size
    await driver.manage().window().setRect(1750, 1000);

    // find email field, click and enter arbitrary email
    await driver.findElement(By.name("email")).click();
    await driver.findElement(By.name("email")).sendKeys("test@test.com");

    // click login button
    await driver.findElement(By.tagName("button")).click(); // login button
  }, 10000);

  // close the driver after all tests have completed
  afterAll(async () => {
    await driver.close();
  }, 10000);

  it("initial", async () => {}); // temporary
});
