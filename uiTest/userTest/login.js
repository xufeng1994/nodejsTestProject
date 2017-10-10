
let uiaction = require('../../common/ui/uiAction')


require ("chromedriver")
var assert = require('assert');
var driver = require('selenium-webdriver');
var web = new driver.Builder().forBrowser('chrome').build();

describe('用户登录', function(){

    this.timeout(600000)
    it('用户登录',async function(){
        await uiaction.userLogin(web,"xufeng","xf13451082032");
    })
})