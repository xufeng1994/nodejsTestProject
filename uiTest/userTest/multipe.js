require("chromedriver")
require("path")
require("../../common/ui/db")
let util = require("../../common/ui/util")
let app = require("../../config/app.config")
var fs = require("fs")
var chrome = require("selenium-webdriver/chrome")
var driver = require('selenium-webdriver')
let web;
const by = driver.By;
let name
let timeCount = new Date().valueOf()

describe("hooks", function () {

    this.timeout(60 * 1000)

    describe("cnode测试用例", function () {

        before("before", async function () {
            console.log("before")
            web = new driver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
            return web.executeScript(function () {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                }
            })
            await web.manage().window().setSize("1366", "768")
        })
        beforeEach("beforeEach", function () {
            //await web.sleep(2000)
            console.log("beforeEach")
        })
        afterEach("afterEach", async function () {
            console.log("afterEach")
            //   截屏操作   存在问题  ：util 方法无法使用
            await web.takeScreenshot().then(function (screenshot) {
                let name = new Date().valueOf()+".png"
                return fs.writeFileSync(util+"/"+name,screenshot, "base64")
            })
        })
        after("after", function () {
            console.log("after")
        })

        describe("用户注册操作", async () => {


            it("打开cnode，点击登录按钮", async () => {
                //    web = new driver.Builder().forBrowser('chrome').build();
                await web.get(app.baseUrl)

            })
            it("最大化窗口", async function () {
                await web.manage().window().setSize(1366, 768)
            })
            it("点击注册按钮", async function () {
                await web.findElement(by.css('a[href="/signup"]')).click()
            })
            it("直接点击注册按钮", async function () {
                //await web.sleep(2000)
                await web.findElement(by.css(".span-primary")).click()

            })
            it("输入用户名，不输入密码点击注册", async function () {
                await web.findElement(by.name('loginname')).sendKeys(timeCount)
                await web.findElement(by.css('.span-primary')).click()
                //await web.sleep(2000)

            })
            it("输入用户名中存在特殊符号“！@#￥%”，点击注册按钮", async function () {
                await web.findElement(by.name('loginname')).sendKeys(timeCount+"!@#$")
                await web.findElement(by.name('pass')).sendKeys("123456")
                await web.findElement(by.name('re_pass')).sendKeys("123456")
                await web.findElement(by.name('email')).sendKeys("123456@qwer.com")
                await web.findElement(by.css('.span-primary')).click()
                //await web.sleep(2000)

            })
            it("输入用户名少于5个字符数，点击注册按钮", async function () {
                await web.findElement(by.name('loginname')).sendKeys("0123")
                await web.findElement(by.name('pass')).sendKeys("123456")
                await web.findElement(by.name('re_pass')).sendKeys("123456")
                await web.findElement(by.name('email')).sendKeys("qqqqq@qwer.com")
                await web.findElement(by.css('.span-primary')).click()
                //await web.sleep(2000)

            })
            it("输入错误的邮件格", async function () {
                await web.findElement(by.name('loginname')).sendKeys(timeCount)
                await web.findElement(by.name('pass')).sendKeys("123456")
                await web.findElement(by.name('re_pass')).sendKeys("123456")
                await web.findElement(by.name('email')).sendKeys("wrwerq@qwer.")
                await web.findElement(by.css('.span-primary')).click()
                //await web.sleep(2000)

            })
            it("输入确认密码与原密码不一致", async function () {
                await web.findElement(by.name('loginname')).sendKeys(timeCount)
                await web.findElement(by.name('pass')).sendKeys("123456qwer")
                await web.findElement(by.name('re_pass')).sendKeys("qwer123456")
                await web.findElement(by.name('email')).sendKeys("qqqqq@qwer.com")
                await web.findElement(by.css('.span-primary')).click()
                //await web.sleep(2000)

            })
            it("输入已注册的邮箱", async function () {
                await web.findElement(by.name('loginname')).sendKeys(timeCount)
                await web.findElement(by.name('pass')).sendKeys("123456qwer")
                await web.findElement(by.name('re_pass')).sendKeys("qwer123456")
                await web.findElement(by.name('email')).sendKeys("914650562@qq.com")
                await web.findElement(by.css('.span-primary')).click()
                //await web.sleep(2000)

            })
            it("输入可注册的用户名密码和邮箱", async function () {
                await web.findElement(by.name('loginname')).sendKeys("000000")
                await web.findElement(by.name('pass')).sendKeys("123456")
                await web.findElement(by.name('re_pass')).sendKeys("123456")
                await web.findElement(by.name('email')).sendKeys(timeCount + "@qwer.com")
                //await web.sleep(2000)
                await web.findElement(by.css('.span-primary')).click().then(function () {
                    MongoClient.connect(url, function (err, db) {
                        assert.equal(null, err);
                        console.log("Connected correctly to server");
                        let collection = db.collection("users")

                        collection.find().toArray(
                            function (err, docs) {
                                assert.equal(null, err);
                                // console.log(docs)
                            }
                        )

                        collection.findOne({ name: `${sunny}` }, function (err, docs) {
                            console.log(docs.name)
                            assert.equal(err, null)
                            assert.equal(`${sunny}`, docs.name)
                        })
                        collection.updateOne({ name: `${sunny}` }, { $set: { "active": true } }, function (err, docs) {
                            assert.equal(null, err);
                            // console.log(docs)
                        })
                        db.close();
                    });
                })
            })
            // it("",function(){

            // })
            // it("",function(){

            // })
            // it("",function(){

            // })
        })
    })
})
