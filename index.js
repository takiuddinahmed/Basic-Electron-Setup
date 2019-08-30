const electron = require('electron');
const {
    ipcRenderer
} = electron;

ipcRenderer.on("toPage", function (e, item) {
    console.log("data found : ");
    console.log(item);


});

ipcRenderer.send("toServer", "hello world");