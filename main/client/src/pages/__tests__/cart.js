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
    await driver.close();
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
        expect(true).toBe(true);
        res();
      }, 1000)
    ); // wait one second to avoid 'stale' error`

    // add starLink to cart (first button is add to cart)
    driver.findElement(By.tagName("button")).click();

    // navigate to cart
    const cartButton = await getElementByHref("cart");
    if (!cartButton) throw new Error("Cart Button not found");
    cartButton.click();

    // find div containing a list of cart items
    const div = await driver.findElement(By.className("css-1on771l"));

    // should only be one item in the cart, get its text
    const text = await div.findElement(By.tagName("a")).getText();

    // expect Starlink-15 in cart
    expect(text).toEqual(expect.stringContaining("Starlink-15"));
  });
});
