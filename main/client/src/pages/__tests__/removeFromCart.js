// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('remove from cart', function() {
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build(); // can be switched to any browser on your PATH var

    await driver.get("http://localhost:3000/"); // assumes server and client are active

    // set window size
    await driver.manage().window().setRect(1750, 1000);

    // find email field, click and enter arbitrary email
    await driver.findElement(By.name("email")).click();
    await driver.findElement(By.name("email")).sendKeys("test@test.com");

    // click login button
    await driver.findElement(By.tagName("button")).click(); // login button
  
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('remove from cart', async function() {
    // Test name: remove from cart
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    //pre-3 | waitForElementPresent | css=.css-10q0vj5:nth-child(2) | 30000
    await driver.wait(until.elementLocated(By.css(".css-10q0vj5:nth-child(2)")), 30000)
    // 2 | click | css=.css-10q0vj5:nth-child(2) | 
    await driver.findElement(By.css(".css-10q0vj5:nth-child(2)")).click()
    // 3 | waitForElementPresent | css=.css-wwcn44 | 30000
    await driver.wait(until.elementLocated(By.css(".css-wwcn44")), 30000)
    // 4 | click | css=.css-wwcn44 | 
    await driver.findElement(By.css(".css-wwcn44")).click()
    //pre-3 | waitForElementPresent | .css-wwcn44 | 30000
    await driver.wait(until.elementLocated(By.css(".css-wwcn44")), 30000)
    // 5 | click | css=.css-wwcn44 | 
    await driver.findElement(By.css(".css-wwcn44")).click()
    // 6 | click | css=.css-1yu82wf:nth-child(2) path:nth-child(4) | 
    await driver.findElement(By.css(".css-1yu82wf:nth-child(2) path:nth-child(4)")).click()
    // 7 | assertText | css=p | No items in your cart
    assert(await driver.findElement(By.css("p")).getText() == "No items in your cart")
  })
})
