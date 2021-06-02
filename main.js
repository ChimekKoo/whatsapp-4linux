const electron = require('electron');
const path = require('path');

const {app, BrowserWindow, Menu, session} = electron;


const URL = "https://web.whatsapp.com/";
const MENU_TEMPLATE = [
    {
        label: "Edit",
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
        ]
    },
    {
        label: "Window",
        submenu: [
            {
                label: "Maximize",
                click: () => {
                    mainWindow.maximize();
                }
            },
            {
                label: "Minimize",
                click: () => {
                    mainWindow.minimize();
                },
                accelerator: "Ctrl+M"
            },
            {
                label: "Fullscreen",
                click: () => {
                    mainWindow.setFullScreen(true);
                },
                accelerator: "F11"
            },
            {
                label: "Close fullscreen",
                click: () => {
                    mainWindow.setFullScreen(false);
                },
                accelerator: "Esc"
            },
            { role: "zoomIn", accelerator: "Ctrl+="},
            { role: "zoomOut", accelerator: "Ctrl+-"},
            { role: "resetZoom" },
            { type: "separator" },
            {
                label: "Reload",
                role: "reload",
                accelerator: "F5"
            },
            {
                label: "Open DevTools",
                click: () => {
                    mainWindow.webContents.openDevTools();
                },
                accelerator: "F12"
            },
            { type: "separator" },
            {
                label: "Close window",
                role: "close",
                accelerator: "Ctrl+W"
            },
            {
                label: "Quit",
                role: "quit",
                accelerator: "Ctrl+Q"
            }
        ]
    }
]


function openWindow() {

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "whatsapp_logo.png"),
        webPreferences: {
            devTools: true,
            nodeIntegration: false
        },
        fullscreen: false
    });
    mainWindow.loadURL(URL);

    const menu = Menu.buildFromTemplate(MENU_TEMPLATE);
    Menu.setApplicationMenu(menu);

    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        electron.shell.openExternal(url);
    });
}

app.on('ready', openWindow)

app.on('activate', openWindow)
