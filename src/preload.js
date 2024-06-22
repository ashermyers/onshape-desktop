// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const webview = document.getElementById('onshape');

  webview.addEventListener('did-finish-load', () => {
    setInterval(() => {
      const title = webview.getTitle();
      ipcRenderer.send('update-title', title);
    }, 50);
  });
});
