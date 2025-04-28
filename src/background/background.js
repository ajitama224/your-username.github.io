// バックグラウンドスクリプト
chrome.runtime.onInstalled.addListener(() => {
  console.log('拡張機能がインストールされました');

  // 右クリックメニューの作成
  chrome.contextMenus.create({
    id: "copyTitleUrl",
    title: "タイトルとURLをコピー",
    contexts: ["page"]
  });
});

// 右クリックメニューのクリック処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyTitleUrl") {
    handleCopy(tab);
  }
});

// コピー処理を実行する関数
async function handleCopy(tab) {
  // chrome://URLの場合は処理をスキップ
  if (tab.url.startsWith('chrome://')) {
    console.log('chrome://URLでは操作できません');
    return;
  }

  try {
    // コンテンツスクリプトを実行
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (title, url) => {
        const text = `${title}\n${url}`;
        navigator.clipboard.writeText(text)
          .then(() => {
            // 通知を表示
            const notification = document.createElement("div");
            notification.textContent = "コピーしました！";
            notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              border-radius: 4px;
              z-index: 10000;
              font-family: Arial, sans-serif;
              box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
          })
          .catch(err => {
            console.error("コピーに失敗しました:", err);
            const notification = document.createElement("div");
            notification.textContent = "コピーに失敗しました";
            notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              padding: 10px 20px;
              background-color: #ff4444;
              color: white;
              border-radius: 4px;
              z-index: 10000;
              font-family: Arial, sans-serif;
              box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
          });
      },
      args: [tab.title, tab.url]
    });
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
} 