import "./style.css";

const scanInput = document.getElementById("scan-input") as HTMLInputElement;
const historyLog = document.getElementById("history-log");

// 常にフォーカスを当てる
document.addEventListener("click", () => scanInput.focus());

scanInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const value = scanInput.value.trim();
    if (!value) return;

    // 1. 履歴に追加
    const entry = document.createElement("div");
    entry.className = "history-item";
    entry.innerText = `${new Date().toLocaleTimeString()} - ${value}`;
    historyLog?.prepend(entry);

    // 2. 入力欄をクリア
    scanInput.value = "";

    // 3. Lambda呼び出しへ（後ほど実装）
    console.log("Processing:", value);
  }
});
