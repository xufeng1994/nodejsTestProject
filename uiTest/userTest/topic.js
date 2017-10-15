require("chromedriver")
var webdriver = new require("selenium-webdriver")
let web = new webdriver.Builder().forBrowser("chrome").build()
let uiAction = require("../../common/ui/uiAction")
let userinfo = require("../../config/userinfo")
let xufeng = userinfo.xufeng
let postPage = require("../../config/uiconfig/postPage")

describe("发布话题", async function(){
    this.timeout(60*1000)
    after("close browser", async function(){
        return await web.quit()
    })
    it ("选择正常发布话题", async function(){
        await uiAction.releaseTopic(web,xufeng.username,xufeng.password)
        await web.findElement(postPage.select).click()
        await web.findElement(postPage.select.ask).click()
        await web.findElement(postPage.title).sendKeys("你在这里可以任意问答");
        await web.findElement(postPage.text).click()
        await web.actions().mouseMove(web.findElement(postPage.textArea)).sendKeys("可以在楼下回复如：你好啊，交个朋友吧").perform()
        await web.sleep(2000)
        await web.findElement(postPage.link).click()
        await web.sleep(2000)
        await web.findElement(postPage.link.title).sendKeys("优酷")
        await web.findElement(postPage.link.linkurl).sendKeys("www.youku.com")
        await web.findElement(postPage.link.submit).click()
        
    })

})
