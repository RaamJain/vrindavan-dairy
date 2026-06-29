const { app, BrowserWindow } = require("electron");

const path = require("path");
const { spawn } = require("child_process");
const waitOn = require("wait-on");
const kill = require("tree-kill");

let backendProcess = null;

const isDevelopment = !app.isPackaged;

async function startBackend() {
  if (isDevelopment) {
    return;
  }

  const backendExecutable = path.join(
    process.resourcesPath,
    "backend",
    process.platform === "win32"
      ? "vrindavan-dairy-backend.exe"
      : "vrindavan-dairy-backend",
  );

  backendProcess = spawn(backendExecutable, [], {
    detached: false,
    stdio: "ignore",
  });

  await waitOn({
    resources: ["http://127.0.0.1:8000/docs"],
    timeout: 30000,
  });
}

function createWindow() {
  const window = new BrowserWindow({
    title: "Vrindavan Dairy",
    width: 1440,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.once("ready-to-show", () => window.show());

  if (isDevelopment) {
    window.loadURL("http://127.0.0.1:5173");
  } else {
    window.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
  }
}

app.whenReady().then(async () => {
  await startBackend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (backendProcess) {
    kill(backendProcess.pid);
  }

  app.quit();
});

app.on("before-quit", () => {
  if (backendProcess) {
    kill(backendProcess.pid);
  }
});
