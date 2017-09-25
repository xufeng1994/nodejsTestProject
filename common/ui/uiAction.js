let ui = require('../../config/uiconfig/indexpage')
let userinfo = require('../../config/userinfo.json')

let userlogin = async function(web){
    await web.get("http://localhost:3000");
    await web.findElement(ui.loginhref).click();

}
let userRegister = async function(web){
    await web.get("http://localhost:3000");
    await web.findElement(ui.registerhref).click();

}

module.expots = userlogin;
module.expots = userRegister;