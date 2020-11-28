const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: `${__dirname}/preload.js`
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path,(err, metadata) => {
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    });
});