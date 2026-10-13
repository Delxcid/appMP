const { app, BrowserWindow } = require('electron')
const path = require('path')

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Rick and Morty - Desktop',
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.setMenuBarVisibility(false)
    mainWindow.loadFile(path.join(__dirname, './src/index.html'))
}

app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})