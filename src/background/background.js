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
    copyTitleAndUrl(tab);
  }
});

// ショートカットキーの処理
chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-title-url") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        copyTitleAndUrl(tabs[0]);
      }
    });
  }
});

// タイトルとURLをコピーする関数
function copyTitleAndUrl(tab) {
  const text = `${tab.title}\n${tab.url}`;
  chrome.tabs.sendMessage(tab.id, { action: "copyToClipboard", text: text });
} 