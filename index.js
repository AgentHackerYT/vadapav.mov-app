const electron = require('electron')
const path = require('path')

const app = electron.app
function createWindow () {
  const win = new electron.BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload:path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  win.loadFile('public/watch.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
