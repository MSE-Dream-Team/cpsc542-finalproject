const { until, Builder, By } = require("selenium-webdriver");

jest.setTimeout(30000); // ugly hack

describe("Selenium Cart Tests", () => {
  let driver;
  let HOST = "http://localhost:3000";

  // open the browser and login before executing all tests
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build(); // can be switched to any browser on your PATH var

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
      // console.log(`${HOST}${hrefVal}`);
      const attribute = await elements[i].getAttribute("href");
      if (`${HOST}${hrefVal}` == attribute) {
        return elements[i];
      }
    }
    return null;
  };

  const timeout = async (milli) => {
    await new Promise((res) =>
      setTimeout(() => {
        expect(true).toBe(true);
        res();
      }, milli)
    );
  };

  it("Add Single Item", async () => {
    // wait until the trips are displayed
    await driver.wait(until.elementLocated(By.className("css-10q0vj5")), 5000);

    const starLink = await getElementByHref("/launch/109"); // starLink = launch-109
    if (!starLink) throw new Error("Launch 109 not found");
    starLink.click();

    await timeout(1000); // wait one second to avoid 'stale' error`

    // add starLink to cart (first button is add to cart)
    driver.findElement(By.tagName("button")).click();

    // navigate to cart
    const cartButton = await getElementByHref("/cart");
    if (!cartButton) throw new Error("Cart Button not found");
    cartButton.click();

    // find div containing a list of cart items
    const div = await driver.findElement(By.className("css-1on771l"));

    // should only be one item in the cart, get its text
    const text = await div.findElement(By.tagName("a")).getText();

    // expect Starlink-15 in cart
    expect(text).toEqual(expect.stringContaining("Starlink-15"));
  });

  it("Add Multiple Items", async () => {
    // continuing from previous test, navigate to home page
    const homeButton = await getElementByHref("/");
    if (!homeButton) throw new Error("Home Button not found");
    homeButton.click();

    // wait until the trips are displayed
    await driver.wait(until.elementLocated(By.className("css-10q0vj5")), 5000);

    const sentinel = await getElementByHref("/launch/108"); // Sentinel = launch-108
    if (!sentinel) throw new Error("Launch 108 not found");
    sentinel.click();
    await timeout(1000);

    // add sentinel to cart (first button is add to cart)
    driver.findElement(By.tagName("button")).click();
    await timeout(1000);

    // navigate to home page
    homeButton.click();
    await timeout(1000);

    // scroll down to view launch 107
    await driver.executeScript("window.scroll(0,250)");

    const crew1 = await getElementByHref("/launch/107"); // Crew-1 = launch-107
    if (!crew1) throw new Error("Launch 107 not found");
    crew1.click();
    await timeout(1000);

    // add crew1 to cart (first button is add to cart)
    driver.findElement(By.tagName("button")).click();
    await timeout(1000);

    // navigate to cart
    const cartButton = await getElementByHref("/cart");
    if (!cartButton) throw new Error("Cart Button not found");
    cartButton.click();

    // array with expected items
    const expectedResults = ["Starlink-15", "Sentinel-6", "Crew-1"];

    // find div containing a list of cart items
    const div = await driver.findElement(By.className("css-1on771l"));

    // get each item from the cart
    const cartItems = await div.findElements(By.tagName("a"));

    // new array containing items as text
    const cartItemTexts = await Promise.all(
      cartItems.map(async (item) => {
        return await item.getText();
      })
    );

    // check for expected items
    expect(cartItemTexts[0]).toEqual(
      expect.stringContaining(expectedResults[0])
    );
    expect(cartItemTexts[1]).toEqual(
      expect.stringContaining(expectedResults[1])
    );
    expect(cartItemTexts[2]).toEqual(
      expect.stringContaining(expectedResults[2])
    );
  });
});
