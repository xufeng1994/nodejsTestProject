let fs = require('fs');

let ui = require('../../config/uiconfig/indexpage')
let registerPage = require('../../config/uiconfig/registerPage')
let loginPage = require('../../config/uiconfig/loginPage')
let userinfo = require('../../config/userinfo.json')
let app = require('../../config/app.config');
let util = require('./util')


let userLogin = async function(web,userName,passWord){
    await web.get(app.baseUrl);
    await web.findElement(ui.loginhref).click();
    await web.findElement(loginPage.username).sendKeys(userName);
    await web.findElement(loginPage.password).sendKeys(passWord);
    await web.findElement(loginPage.submit).click();
}

let userRegister = async function (web,loginname,pass,re_pass,email){
    await web.get(app.baseUrl)
    await web.findElement(registerPage.registerUrl).click();
    await web.findElement(registerPage.loginName).sendKeys(loginname);
    await web.findElement(registerPage.pass).sendKeys(pass);
    await web.findElement(registerPage.rePass).sendKeys(re_pass);
    await web.findElement(registerPage.email).sendKeys(email);
    await web.findElement(registerPage.sudmit).click();
}

let saveScreenShots = async function (web){
    let screenshotdir = util.getScreenshotsDir();
    let imagedata = await web.takeScreenshot();
    fs.writeFileSync(screenshotdir+ "/"+ new Date().valueOf()+".png",imagedata,"base64");
}

module.exports.userLogin = userLogin;
module.exports.userRegister = userRegister;
