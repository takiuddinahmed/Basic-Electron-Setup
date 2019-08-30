 //handle setupevents as quickly as possible
 const setupEvents = require('./installers/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
     // squirrel event handled and app will exit in 1000ms, so don't do anything else
     return;
 }
 const {
     app,
     BrowserWindow,
     Menu,
     ipcMain
 } = require('electron')
 const path = require('path')

 process.env.NODE_ENV = 'debug'

 let mainWindow

 function createWindow() {
     mainWindow = new BrowserWindow({
         width: 1200,
         height: 800,
         webPreferences: {
             //    preload: path.join(__dirname, 'preload.js')
             nodeIntegration: true
         }
     })

     mainWindow.loadFile('index.html')

     //mainWindow.webContents.openDevTools();

     mainWindow.on('closed', function () {
         mainWindow = null;
         app.quit();
     })

     var menu = Menu.buildFromTemplate(mainMenuTample);
     Menu.setApplicationMenu(menu);
 }

 // ipc

 ipcMain.on('toServer', function (e, item) {
     console.log(item);
     mainWindow.webContents.send('toPage', "Hello");
 });



 app.on('ready', createWindow)

 app.on('window-all-closed', function () {
     if (process.platform !== 'darwin') app.quit()
 })

 app.on('activate', function () {
     if (mainWindow === null) createWindow()
 })

 const mainMenuTample = [{
     label: 'Menu',
     submenu: [{
             label: 'Menu 1',

         },
         {
             label: 'Reload',
             role: 'reload'
         },

         {
             label: 'Exit',
             click() {
                 app.quit();
             }
         }
     ]
 }]


 if (process.env.NODE_ENV !== 'production') {
     mainMenuTample.push({
         label: 'Development Tools',
         submenu: [

             {
                 role: 'reload'
             }, {
                 role: 'toggledevtools'
             }

         ]
     })
 }