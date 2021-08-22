const { contextBridge, ipcRenderer } = require('electron')
const { remote } = require('electron')
const { getNativeFunction,getBufferPointer,sizeof } = require('sbffi');


contextBridge.exposeInMainWorld(
    'electron',
    {
        min: () => remote.BrowserWindow.getFocusedWindow().minimize(),
        close: () => remote.BrowserWindow.getFocusedWindow().close(),
		getNativeFunction:(...Args) => getNativeFunction(...Args),
		getBufferPointer:(...Args) => getBufferPointer(...Args),
		sizeof:(...Args) => {return sizeof(...Args)},
    }
)