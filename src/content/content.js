// コンテンツスクリプト
console.log('コンテンツスクリプトが読み込まれました');

// メッセージを受け取ったときの処理
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyToClipboard") {
    // クリップボードにコピー
    navigator.clipboard.writeText(request.text)
      .then(() => {
        // コピー成功時の通知
        showNotification("コピーしました！");
      })
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
        showNotification("コピーに失敗しました", true);
      });
  }
});

// 通知を表示する関数
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: ${isError ? "#ff4444" : "#4CAF50"};
    color: white;
    border-radius: 4px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(notification);
  
  // 3秒後に通知を消す
  setTimeout(() => {
    notification.remove();
  }, 3000);
} 