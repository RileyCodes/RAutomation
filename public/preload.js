const { contextBridge, ipcRenderer } = require('electron')
const { remote } = require('electron')


contextBridge.exposeInMainWorld(
    'electron',
    {
        min: () => remote.BrowserWindow.getFocusedWindow().minimize(),
        close: () => remote.BrowserWindow.getFocusedWindow().close()
    }
)