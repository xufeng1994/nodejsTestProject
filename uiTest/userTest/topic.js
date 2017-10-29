require("chromedriver")
var webdriver = new require("selenium-webdriver")
let until = require("selenium-webdriver/lib/until")
let web = new webdriver.Builder().forBrowser("chrome").build()
let {userAction} = require("../../common/ui/uiAction")
let useraction = new userAction();
let userinfo = require("../../config/userinfo")
let xufeng = userinfo.xufeng
let postPage = require("../../config/uiconfig/postPage")
let dbAction = require("../../common/ui/db.js")
let util = require("../../common/ui/util")
let picpath = util.getScreenshotsDir()

describe("发布话题", async function(){
    this.timeout(60*1000)
    after("close browser", async function(){
        //return await web.quit()
    })
    it ("选择正常发布话题", async function(){
        // await uiAction.userRegister(web,xufeng.username,xufeng.password,xufeng.password,xufeng.email)
        // dbAction.activeUser(xufeng.username)
        await useraction.releaseTopic(web,xufeng.username,xufeng.password)
        await web.findElement(postPage.select).click()
        await web.findElement(postPage.select.share).click()
        await web.findElement(postPage.title).sendKeys("关于JavaScript的问题回答都在这里");
        await web.findElement(postPage.text).click()
        await web.actions().mouseMove(web.findElement(postPage.textArea)).sendKeys("可以在该楼层回复问答技术相关问题").perform()
        await web.findElement(postPage.link).click()
        await web.sleep(2000)
        await web.findElement(postPage.link.title).sendKeys("youtube")
        await web.findElement(postPage.link.linkurl).sendKeys("www.youtube.com")
        await web.findElement(postPage.link.submit).click()
        await web.sleep(1000)
        await web.findElement(postPage.image).click()
        await web.sleep(2000)
        await web.findElement(postPage.image.file).sendKeys(picpath+"/1508336193699.png")
        await web.sleep(2000)
        await web.findElement(postPage.submit).click()
        
    })

})

