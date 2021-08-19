const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const path = require('path');

const { app, BrowserWindow  } = require('electron');
const isDev = require('electron-is-dev');




function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
	autHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });



  win.removeMenu();

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS )
        .then((name) => {
		console.log(`Added Extension:  ${name}`);
			createWindow();
        const win = BrowserWindow.getFocusedWindow()
        if (win) {
          win.webContents.on('did-frame-finish-load', () => {
            win.webContents.once('devtools-opened', () => {
              win.webContents.focus()
            })
            // open electron debug
            console.log('Opening dev tools')
            win.webContents.openDevTools()
          })
        }
			}
		)
        .catch((err) => console.log('An error occurred: ', err));
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();


  }


});