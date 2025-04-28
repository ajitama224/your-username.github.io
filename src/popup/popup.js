document.addEventListener('DOMContentLoaded', function() {
  const copyButton = document.getElementById('copyButton');
  const statusDiv = document.getElementById('status');

  copyButton.addEventListener('click', async () => {
    try {
      // 現在のタブの情報を取得
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // タイトルとURLを組み合わせてコピー
      const textToCopy = `${tab.title}\n${tab.url}`;
      await navigator.clipboard.writeText(textToCopy);
      
      statusDiv.textContent = 'コピーしました！';
      statusDiv.style.color = '#4CAF50';
    } catch (error) {
      statusDiv.textContent = 'エラーが発生しました';
      statusDiv.style.color = '#f44336';
      console.error('Error:', error);
    }
  });
}); 