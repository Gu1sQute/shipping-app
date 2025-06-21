import React, { useState } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  // 宣告一個名為 'message' 的狀態變數，初始值為 "歡迎來到船務管理系統"
  const [message, setMessage] = useState("歡迎來到船務管理系統");

  // 定義一個函式來更新 message 狀態
  const handleChangeMessage = () => {
    setMessage("您已點擊按鈕，系統準備啟動！");
  };

  return (
    <div className="App">
      <Header title="船務管理中心" />
      <h1>{message}</h1> {/* 顯示 message 狀態的值 */}
      <p>準備好建立你的第一個 React 應用程式了嗎？</p>
      <button onClick={handleChangeMessage}>點我啟動</button> {/* 點擊按鈕時觸發函式 */}
    </div>
  );
}

export default App;