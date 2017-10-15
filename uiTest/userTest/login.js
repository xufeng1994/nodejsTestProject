
let uiaction = require('../../common/ui/uiAction')
let loginPage = require('../../config/uiconfig/loginPage')

let userinfo = require('../../config/userinfo')
let xufeng =userinfo.xufeng


require("chromedriver")
var assert = require('assert');
var driver = require('selenium-webdriver');
var web = new driver.Builder().forBrowser('chrome').build();

describe('用户登录', function () {

    this.timeout(600000)
    before("befor ",async function(){
        //  before todo
    })

    afterEach('tackscreenshot', async function () {
        await uiaction.saveScreenShots(web);
        await web.manage().deleteAllCookies();
    })

    after(' close browser', async function () {
        //await web.manage().deleteAllCookies();
        return await web.quit();
    })

    describe("异常登录是否会提示正确", async function () {

        it("直接点击登录按钮", async function () {
            await uiaction.userLogin(web,"","")
            let errortip = await web.findElement(loginPage.errortip).getText()
            console.log(errortip)
            return assert.ok(errortip.indexOf("信息不完整") > -1)
        })

        it("输入不存在的用户名", async function () {
            await uiaction.userLogin(web, "qweqrwqwe", "1233454")
            let errortip = await web.findElement(loginPage.errortip).getText()
            console.log(errortip)
            return assert.ok(errortip.indexOf("用户名或密码错误") > -1)
        })
        it("输入密码错误", async function () {
            await uiaction.userLogin(web, xufeng.username, "qwerqwer")
            let errortip = await web.findElement(loginPage.errortip).getText()
            console.log(errortip)
            // return assert.deepEqual("x\n用户名或密码错误",errortip)
            return assert.ok(errortip.indexOf("用户名或密码错误") > -1)
        })

    })
    
    it("输入正确的用户名和密码登录", async function () {
        await uiaction.userLogin(web, xufeng.username, xufeng.password)
    })
})