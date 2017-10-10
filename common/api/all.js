/**
 * 
 * http://192.168.198.129:3000/api/v1/topics
 * 
 */
let assert = require("assert");
let axios = require("axios")
let url = "http://192.168.198.129:3000/api/v1";
axios.get(url + "/topics").then(function (res) {
    console.log(res.data.data.length)
    assert.deepEqual("2",res.data.data.length)
});