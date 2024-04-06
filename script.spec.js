const assert = require("assert");
require("dotenv").config();
const { By, Builder, until } = require("selenium-webdriver");

describe("Tests", async function () {
  let driver;
  this.timeout(11000);

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Get logo text by id", async () => {
    await driver.get("http://localhost:4000/");
    let elementById = await driver.findElement(By.id("LogoIntouch"));
    let LogoText = await elementById.getText();
    assert.strictEqual(LogoText, "nTouch");
  });

  it("Get logo text by className", async () => {
    await driver.get("http://localhost:4000/");
    let elementByClassName = await driver.findElement(
      By.className("_navbarWrapper_16ijg_53")
    );
    let Navbar = await elementByClassName.isDisplayed();
    assert.strictEqual(Navbar, true);
  });

  it("Get logo text by css", async () => {
    await driver.get("http://localhost:4000/");
    let elementByClassName = await driver.findElement(
      By.css("._navbarWrapper_16ijg_53")
    );
    let Navbar = await elementByClassName.isDisplayed();
    assert.strictEqual(Navbar, true);
  });

  it("Get navbar by xpath ", async () => {
    await driver.get("http://localhost:4000/");
    let elementByXpath = await driver.findElement(
      By.xpath(`//*[@id="root"]/div[1]/div/div/a`)
    );
    let Navbar = await elementByXpath.isDisplayed();
    assert.strictEqual(Navbar, true);
  });

  it("sleep", async () => {
    await driver.get("http://localhost:4000/");
    await driver.findElement(By.className("_btn_1c799_54"));
    await driver.sleep(10000);
    let element = await driver.findElement(By.className("_btn_1c799_54"));
    assert(await element.isDisplayed(), "Displayed");
  });

  it("Implicit", async () => {
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get("http://localhost:4000/");
    let elementById2 = await driver.findElement(
      By.className("_navbarWrapper_16ijg_53")
    );
    assert.strictEqual(await elementById2.isDisplayed(), true);
  });

  it("Explicit", async () => {
    await driver.get("http://localhost:4000/");
    let elementById = await driver.findElement(
      By.className("_navbarWrapper_16ijg_53")
    );
    await driver.wait(until.elementIsVisible(elementById), 5000);
    assert.strictEqual(await elementById.isDisplayed(), true);
  });

  it("Test Login", async () => {
    await driver.get("http://localhost:4000/");
    await driver.findElement(By.className("_btn_1c799_54")).click();
    let nickNameInput = await driver.findElement(By.name("username"));
    let NickName = process.env.USERNAMEINTOUCH;
    let Password = process.env.PASSWORD;
    await nickNameInput.sendKeys(NickName);
    let PasswordInput = await driver.findElement(By.name("password"));
    await PasswordInput.sendKeys(Password);
    await driver.findElement(By.id("btnAuthLogin")).click();
    let btnLogout = await driver.findElement(By.className("_btn_18q0f_163"));
    await driver.wait(until.elementIsVisible(btnLogout), 5000);
    assert.strictEqual(await btnLogout.isDisplayed(), true, "Login Success");
  });

  after(async () => {
    await driver.quit();
  });
});
