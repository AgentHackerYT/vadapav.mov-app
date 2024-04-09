const electron = require('electron')
const path = require('path')
let data = {};

try{
data = JSON.parse(require("fs").readFileSync("./data.json", "utf-8")) 
}catch(e){
  require("fs").writeFileSync("./data.json", '{"width": 1017, "height": 600}')
  data = {width: 1017, height: 600}
}


const app = electron.app
function createWindow () {
  const win = new electron.BrowserWindow({
    autoHideMenuBar: true,
    width: data?.width || 1017,
    height: data?.height || 600,
    webPreferences: {
      preload:path.join(__dirname, 'app.js'),
      nodeIntegration: true
    }
  })
  win.on("resize", (x) =>{
    data.width = win.getSize()[0]
    data.height = win.getSize()[1]
    require("fs").writeFileSync("./data.json", JSON.stringify(data))
  })
  win.on('close', async e => {
    e.preventDefault()
  
    const { response } = await electron.dialog.showMessageBox(win, {
      type: 'question',
      title: '  Confirm  ',
      message: 'Are you sure that you want to close this window?',
      buttons: ['Yes', 'No'],
    })
  
    response === 0 && win.destroy()
  })

  win.loadFile('public/index.html')
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
