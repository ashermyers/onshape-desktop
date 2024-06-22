const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("node:path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, "onshape.png"),
    title: "Onshape",
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  app.disableHardwareAcceleration(false);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  app.setAboutPanelOptions({
    applicationName: "Onshape",
    applicationVersion: "v1.0",
    version: "v1.0",
    credits: "Created by Asher Myers <asher@16461.org> \n from FTC Team 16461 Infinite Turtles",
    website: "16461.org",
  });
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Listen for title updates from the preload script
ipcMain.on("update-title", (event, title) => {
  if (mainWindow) {
    mainWindow.setTitle(title);
  }
});
