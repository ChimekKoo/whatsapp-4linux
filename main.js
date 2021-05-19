const electron = require('electron');
const path = require('path');

const {app, BrowserWindow, Menu, session} = electron;

let mainWindow;


function openWindow() {

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "whatsapp_logo.png"),
        webPreferences: {
            devTools: false,
            nodeIntegration: false
        }
    });
    mainWindow.loadURL("https://web.whatsapp.com/");

    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);
}

app.on('ready', openWindow)

app.on('activate', openWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})