require("chromedriver")
require("path")
let db = require("../../common/ui/db")
let uiAction = require("../../common/ui/uiAction")
let app = require("../../config/app.config")
var fs = require("fs")
let registerPage = require('../../config/uiconfig/registerPage')
let loginPage = require('../../config/uiconfig/loginPage')
let indexPage = require('../../config/uiconfig/indexPage')
let assert = require("assert")
var chrome = require("selenium-webdriver/chrome")
var driver = require('selenium-webdriver')
let web;
const by = driver.By;
let name
let timeCount = new Date().valueOf()
let MongoClient = app.mongodbUrl

describe("hooks", function () {

    this.timeout(60 * 1000)

    describe("cnode测试用例", function () {

        before("before", async function () {
            console.log("before")
            // web = new driver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
            // return web.executeScript(function () {
            //     return {
            //         width: window.screen.availWidth,
            //         height: window.screen.availHeight
            //     }
            // })
            // await web.manage().window().setSize("1366", "768")
            web = new driver.Builder().forBrowser("chrome").build()

        })
        beforeEach("beforeEach", function () {
            //await web.sleep(2000)
            console.log("beforeEach")
        })
        afterEach("afterEach", async function () {
            console.log("afterEach")
            //   截屏操作   存在问题  ：util 方法无法使用
            await uiAction.saveScreenShots(web)
        })
        after("after", async function () {
            console.log("after")
            // 执行完成后关闭用例
            return await web.quit()
        })

        it('注册窗口是否可以正常打开？', async function () {
            await web.get(app.baseUrl);
            await web.findElement(registerPage.registerUrl).click();
            // 验证页面中的元素是否存在
            return assert.ok(web.findElement({ css: "#content > div > div.header > ul > li.active" }));
        })

        it('注册窗口UI显示正常', async function () {
            await web.get(app.baseUrl);
            await web.findElement(registerPage.registerUrl).click();
            // 验证页面中的元素是否存在
            return assert.ok(web.findElement({ css: "#content > div > div.header > ul > li.active" }));
        })

        describe("用户注册操作", async () => {
            it('直接点击登录按钮，提示 信息不完整', async () => {
                await uiAction.userRegister(web,"","","","")
            })

            it('两次密码不一致 应该收到<两次密码输入不一致。>提示', async function () {
                await uiAction.userRegister(web, "qwerertye", "123456", "654321", "youupdate@qqq.com")
                let errortip = await web.findElement(registerPage.errortip).getText();
                //验证提示信息是否正确
                return assert.deepEqual("×\n两次密码输入不一致。", errortip);
            })

            it('email 格式不正确,提示 邮箱不合法。', async function () {
                await uiAction.userRegister(web, "xufeng1994", "123456", "123456", "qwerqe1234")
                let errortip = await web.findElement(registerPage.errortip).getText();
                //邮箱不合法。
                return assert.ok(errortip.indexOf("邮箱不合法。") > -1);
            })

            it('用户名存在，提示用户名或邮箱已被使用。', async function () {
                await uiAction.userRegister(web, "xufeng", "123456", "123456", "youupdate@qqq.com")
                let errortip = await web.findElement(registerPage.errortip).getText();
                //用户名或邮箱已被使用。
                return assert.ok(errortip.indexOf("用户名或邮箱已被使用。"));
            })
            it('邮箱已经被使用，提示用户名或邮箱已被使用。', async function () {
                await uiAction.userRegister(web, "xufeng", "123456", "123456", "914650562@qq.com")
                let errortip = await web.findElement(registerPage.errortip).getText();
                //用户名或邮箱已被使用。
                return assert.ok(errortip.indexOf("用户名或邮箱已被使用。"));
            })

            it('注册成功后是否显示激活提示信息', async function () {
                await web.get(app.baseUrl);
                let nowdate = new Date().valueOf();
                await uiAction.userRegister(web, nowdate, "123456", "123456", nowdate + "@qq.com")
                let successtip = await web.findElement(registerPage.successtip).getText();
                //欢迎加入 Nodeclub！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。
                let actualtip = "欢迎加入 Nodeclub！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。"
                return assert.deepEqual(actualtip, successtip);
            })

            it('注册成功后是否收到邮件', async function () {
                //暂不支持 todo
            })
            it('使用未激活的账户登录', async function () {
                await web.get(app.baseUrl);
                let nowdate = new Date().valueOf();
                await uiAction.userRegister(web,nowdate,"123456","123456",nowdate+"@163.com")
                await uiAction.userLogin(web,nowdate,"123456");
                //此帐号还没有被激活，激活链接已发送到 1506689011794@163.com 邮箱，请查收。
                let actualtip = `此帐号还没有被激活，激活链接已发送到 '${nowdate}'@163.com 邮箱，请查收。`
                let errortip =  await web.findElement(loginPage.errortip).getText();
                console.log(web.findElement(loginPage.errortip).getText())
                return assert.ok(errortip.indexOf(actualtip) > 0)
            })
            it('激活后能够正常登录', async function () {
                await web.get(app.baseUrl);
                let nowdate = new Date().valueOf();
                await uiAction.userRegister(web,nowdate,"123456","123456",nowdate+"@163.com")
                // todo new Promise() async
                db.activeUser(nowdate);
                await uiAction.userLogin(web,nowdate,"123456");
                //验证登录成功后首页显示用户名
                let assertUserName = await web.findElement(indexPage.username).getText();
                return assert.equal(assertUserName,nowdate)
            })
            // it("直接点击注册按钮", async function () {
            //     //await web.sleep(2000)
            //     await web.findElement(by.css(".span-primary")).click()

            // })
            // it("输入用户名，不输入密码点击注册", async function () {
            //     await web.findElement(by.name('loginname')).sendKeys(timeCount)
            //     await web.findElement(by.css('.span-primary')).click()
            //     //await web.sleep(2000)

            // })
            // it("输入用户名中存在特殊符号“！@#￥%”，点击注册按钮", async function () {
            //     await web.findElement(by.name('loginname')).sendKeys(timeCount+"!@#$")
            //     await web.findElement(by.name('pass')).sendKeys("123456")
            //     await web.findElement(by.name('re_pass')).sendKeys("123456")
            //     await web.findElement(by.name('email')).sendKeys("123456@qwer.com")
            //     await web.findElement(by.css('.span-primary')).click()
            //     //await web.sleep(2000)

            // })
            // it("输入用户名少于5个字符数，点击注册按钮", async function () {
            //     await web.findElement(by.name('loginname')).sendKeys("0123")
            //     await web.findElement(by.name('pass')).sendKeys("123456")
            //     await web.findElement(by.name('re_pass')).sendKeys("123456")
            //     await web.findElement(by.name('email')).sendKeys("qqqqq@qwer.com")
            //     await web.findElement(by.css('.span-primary')).click()
            //     //await web.sleep(2000)

            // })
            // it("输入错误的邮件格", async function () {
            //     await web.findElement(by.name('loginname')).sendKeys(timeCount)
            //     await web.findElement(by.name('pass')).sendKeys("123456")
            //     await web.findElement(by.name('re_pass')).sendKeys("123456")
            //     await web.findElement(by.name('email')).sendKeys("wrwerq@qwer.")
            //     await web.findElement(by.css('.span-primary')).click()
            //     //await web.sleep(2000)

            // })
            // it("输入确认密码与原密码不一致", async function () {
            //     await web.findElement(by.name('loginname')).sendKeys(timeCount)
            //     await web.findElement(by.name('pass')).sendKeys("123456qwer")
            //     await web.findElement(by.name('re_pass')).sendKeys("qwer123456")
            //     await web.findElement(by.name('email')).sendKeys("qqqqq@qwer.com")
            //     await web.findElement(by.css('.span-primary')).click()
            //     //await web.sleep(2000)

            // })
            // it("输入已注册的邮箱", async function () {
            //     await web.findElement(by.name('loginname')).sendKeys(timeCount)
            //     await web.findElement(by.name('pass')).sendKeys("123456qwer")
            //     await web.findElement(by.name('re_pass')).sendKeys("qwer123456")
            //     await web.findElement(by.name('email')).sendKeys("914650562@qq.com")
            //     await web.findElement(by.css('.span-primary')).click()
            //     //await web.sleep(2000)

            // })
            // it("输入可注册的用户名密码和邮箱", async function () {
            //     await web.findElement(by.name('loginname')).sendKeys("000000")
            //     await web.findElement(by.name('pass')).sendKeys("123456")
            //     await web.findElement(by.name('re_pass')).sendKeys("123456")
            //     await web.findElement(by.name('email')).sendKeys(timeCount + "@qwer.com")
            //     //await web.sleep(2000)
            //     await web.findElement(by.css('.span-primary')).click().then(function () {
            //         MongoClient.connect(url, function (err, db) {
            //             assert.equal(null, err);
            //             console.log("Connected correctly to server");
            //             let collection = db.collection("users")

            //             collection.find().toArray(
            //                 function (err, docs) {
            //                     assert.equal(null, err);
            //                     // console.log(docs)
            //                 }
            //             )

            //             collection.findOne({ name: `${sunny}` }, function (err, docs) {
            //                 console.log(docs.name)
            //                 assert.equal(err, null)
            //                 assert.equal(`${sunny}`, docs.name)
            //             })
            //             collection.updateOne({ name: `${sunny}` }, { $set: { "active": true } }, function (err, docs) {
            //                 assert.equal(null, err);
            //                 // console.log(docs)
            //             })
            //             db.close();
            //         });
            //     })
            // })
            // it("",function(){

            // })
            // it("",function(){

            // })
            // it("",function(){

            // })
        })
    })
})
