const { until, Builder, By } = require("selenium-webdriver");

jest.setTimeout(30000); // ugly hack

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
    // await driver.close();
  }, 10000);

  // finds button by href value
  const getElementByHref = async (hrefVal) => {
    const elements = await driver.findElements(By.tagName("a"));
    for (var i = 0; i < elements.length; ++i) {
      const attribute = await elements[i].getAttribute("href");
      if (attribute.includes(hrefVal)) {
        return elements[i];
      }
    }
    return null;
  };

  it("Add Single Item", async () => {
    // wait until the trips are displayed
    await driver.wait(until.elementLocated(By.className("css-10q0vj5")), 5000);

    const starLink = await getElementByHref("109"); // starLink = launch-109
    if (!starLink) throw new Error("Launch 109 not found");
    starLink.click();

    await new Promise((res) =>
      setTimeout(() => {
        console.log("Why don't I run?");
        expect(true).toBe(true);
        res();
      }, 1000)
    ); // wait one second to avoid 'stale' error`

    // add starLink to cart

    // navigate to cart
    const cartButton = await getElementByHref("cart");
    if (!cartButton) throw new Error("Cart Button not found");
    cartButton.click();

    // expect one item
  });
});
