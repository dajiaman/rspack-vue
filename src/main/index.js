import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow = null;

export const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    show: false,
    icon: path.resolve(__dirname, '../assets/icon.svg'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.on('ready-to-show', () => {
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
    mainWindow.show();
  });

  // development mode
  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
  } else {
    mainWindow.loadFile(path.resolve(__dirname, './renderer/index.html'));
  }
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// ipc 通信
