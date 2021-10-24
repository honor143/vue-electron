import { app, BrowserWindow,session,Menu} from 'electron' // eslint-disable-line

import { autoUpdater } from 'electron-updater'

const {ipcMain} = require('electron')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}




let mainWindow
// 本地协议与服务器协议一致
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function updateHandle() {

  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
  };
  // const os = require('os');
  // const uploadUrl = "http://10.88.158.207/AUTH/static/";
  const uploadUrl = "http://10.88.147.59/AUTH/static/";
  // const uploadUrl = "http://10.88.158.206:8090/OMS/static/";
  // const uploadUrl = "http://10.88.158.206:8091/OMS/static/download";
  
  autoUpdater.setFeedURL(uploadUrl);
  autoUpdater.on('error', function (error) {
    sendUpdateMessage(message.error);
  });
  autoUpdater.on('checking-for-update', function () {
    sendUpdateMessage(message.checking);
  });
  autoUpdater.on('update-available', function (info) {
    sendUpdateMessage(message.updateAva);
  });
  autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage(message.updateNotAva);
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    mainWindow.webContents.send('downloadProgress', progressObj)
  })
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {

    ipcMain.on('isUpdateNow', (e, arg) => {
      //some code here to handle event
      autoUpdater.quitAndInstall();
    });

    mainWindow.webContents.send('isUpdateNow')
  });

  ipcMain.on("checkForUpdate",() => {
      //执行自动更新检查
      autoUpdater.checkForUpdates();
  })
}

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
  mainWindow.webContents.send('message', text)
}




function createWindow () {
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    useContentSize: true,
    show: false,
    resizable:false,
    width:833,
    height:393,
   
    webPreferences: {
      nativeWindowOpen:true, //使用原生window.open()时子窗口属性与父窗口保持一致
      webSecurity: true,
      // nodeIntegation: false,//是否支持完整的node

      // partition: "in-mem"
      //显示控制台
      devTools:true
    }
    // webPreferences: {webSecurity: false}//取消同源限制，允许跨域访问数据
  })
  // mainWindow.webContents.openDevTools()
  
  // mainWindow.webContents.on('did-get-redirect-request', function(e, oldURL, newURL, isMainFrame, httpResponseCode, requestMethod, refeerrer, header) {
  //       if (isMainFrame)
  //       {
  //           setTimeout(() => win.loadURL(newURL), 100);
  //           e.preventDefault();
  //       }
  //   });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })
  mainWindow.setMenu(null);
  mainWindow.loadURL(winURL); 
  //mainWindow.maximize()
  updateHandle();


  const ses = session.fromPartition('persist:name')
  mainWindow.on('closed', () => {
      // 关闭浏览器清除cookie
      session.defaultSession.clearStorageData({storages:['cookie']}, function (error) {
        if (error) console.error(error);
      })
      mainWindow = null
    })
  // 客户端关闭之前触发（在close事件之前）
  mainWindow.onbeforeunload = (e) => {
    console.log('I do not want to be closed')
    //mainWindow.webContents.send('logout')
    //与通常的浏览器不同,会提示给用户一个消息框,
    //返回非空值将默认取消关闭
    //建议使用对话框 API 让用户确认关闭应用程序.
    e.returnValue = false // 相当于 `return false` ，但是不推荐使用
  }
  // 监听原生window.open创建的window
  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
      event.preventDefault()
      Object.assign(options, {
        // modal: true,
        center:true,
        resizable:true,
        parent: mainWindow,
        width: 1000,
        height: 600
      })
      event.newGuest = new BrowserWindow(options)
  })
}



//客户端添加证书（暂时不知道添加上了没有）
// app.commandLine.appendSwitch('--client-certificate', '../../ctr/server.crt');
// app.commandLine.appendSwitch('--client-certificate', '../../ctr/server.key');

/*app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  console.log(url)
  if (url === 'https://10.88.158.207/FixedIncomeSys') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})*/
// 忽略证书错误
// app.commandLine.appendSwitch('--ignore-certificate-errors');
app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    // console.log(app.Certificate)
    createWindow()
    win.once('ready-to-show', () => {
      win.show()
    })
  }
})

ipcMain.on('setCookie', (event, arg) => {
    //登录成功后设置窗口最大
    // mainWindow.setFullScreenable(true);
    
    
    // mainWindow.setMaximizable(true);
    // mainWindow.isFullScreenable(true);
    // console.log("主进程接受到setCookie" + arg) // prints "ping"
    const cookie = {url: 'http://10.88.234.18:8090/', name: 'userId', value: arg}
    session.defaultSession.cookies.set(cookie, (error) => {
      event.sender.send('cookieDone', arg)
      event.returnValue = arg;
      if (error) console.error(error)
    })
    mainWindow.setResizable(true);
    mainWindow.maximize();
    
})
 ipcMain.on('getCookie', (event, arg) => {
    session.defaultSession.cookies.get({ url : "http://10.88.234.18:8090/" }, function(error, cookies) {
      // console.log(cookies);
      // console.log("主进程接受到getCookie" + arg) // prints "ping"
      event.returnValue = cookies;
      if (error) console.error(error)
    });
 })
// 渲染进程中退出登录成功，清除本地cookie
ipcMain.on('logoutSuccess', (event, arg) => {
    session.defaultSession.clearStorageData({origin:'http://10.88.234.18:8090/',storages:['cookie']}, function (error) {
      if (error) console.error(error);
    })
    event.returnValue = 'removeCookieSuc';
    mainWindow.setSize(833, 393,true);
    mainWindow.setContentSize(833, 393,true) 
    mainWindow.setResizable(false);
    mainWindow.center();
    console.log("logoutSuccess清除cookie");
    
    // event.sender.send('removeCookieSuc', 'success');
     
 })
// 监听渲染进程中的showProcessDetail事件，创建新的窗口显示流程图
 ipcMain.on('showProcessDetail', (event, arg) => {
    const newwin = new BrowserWindow({
        useContentSize: true,
        // frame:false,
        parent: mainWindow //主窗口
    })
    
    newwin.loadURL(`http://10.88.234.18:8090/FixedIncomeSys/inst/selectBpmnHtml?id=${arg}`); 

 })
    
   
   // 查询与指定 url 相关的所有 cookies.




// })
/*app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  console.error("证书验证失败！！！！！！")
  if (url === 'https://github.com') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    
    callback(false)
  }
})*/
// app.on('select-client-certificate', (event, webContents, url, list, callback) => {
//   debugger;
//   console.log(list)
//   event.preventDefault()
//   callback(list[0])
// })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
