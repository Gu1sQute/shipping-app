import React, { useState } from 'react';
import Header from './components/Header';
import ProductSearch from './components/ProductSearch';
import OrderForm from './components/OrderForm';
import OrderHistory from './components/OrderHistory';
import './App.css';

function App() {
  // 宣告一個名為 'message' 的狀態變數，初始值為 "歡迎來到船務管理系統"
  const [message, setMessage] = useState("歡迎來到船務管理系統");

  // 新增一個狀態來儲存所有的模擬貨品資料
  // 每個貨品物件包含 id, name (名稱), price (單價), supplier (供應商)
  const [allProducts] = useState([
    { id: 'p001', name: '螺絲 M8', price: 0.5, supplier: 'A供應商' },
    { id: 'p002', name: '鋼板 10mm', price: 120, supplier: 'B供應商' },
    { id: 'p003', name: '橡膠墊片', price: 1.2, supplier: 'A供應商' },
    { id: 'p004', name: '螺帽 M8', price: 0.3, supplier: 'C供應商' },
    { id: 'p005', name: '水泵', price: 350, supplier: 'B供應商' },
    { id: 'p006', name: '軸承', price: 45, supplier: 'A供應商' },
  ]);

  // 新增一個狀態來儲存搜尋結果
  const [searchResults, setSearchResults] = useState([]);

  // 新增一個狀態來儲存所有歷史訂單
  const [historicalOrders, setHistoricalOrders] = useState([]); // 初始為空陣列
  console.log('當前歷史訂單:', historicalOrders);

  const handleChangeMessage = () => {
    setMessage("系統已啟動，開始查詢貨品！"); // 調整啟動訊息
  };

  // 定義一個搜尋函式，它將作為 props 傳遞給 ProductSearch
  const handleSearch = (searchTerms) => { // 現在接收一個物件 { name: '...', supplier: '...' }
    const { name: searchName, supplier: searchSupplier } = searchTerms; // 解構賦值，方便使用

    // 如果所有搜尋條件都為空，則顯示所有產品
    if (!searchName && !searchSupplier) {
      setSearchResults(allProducts);
      return;
    }

    // 過濾邏輯現在需要同時檢查多個條件
    const filteredProducts = allProducts.filter(product => {
      const productNameLower = product.name.toLowerCase();
      const productSupplierLower = product.supplier.toLowerCase();
      const searchNameLower = searchName ? searchName.toLowerCase() : '';
      const searchSupplierLower = searchSupplier ? searchSupplier.toLowerCase() : '';

      // 貨品名稱條件：如果 searchName 有值，則產品名稱必須包含 searchName
      const matchesName = searchNameLower ? productNameLower.includes(searchNameLower) : true;
      // 供應商條件：如果 searchSupplier 有值，則產品供應商必須包含 searchSupplier
      const matchesSupplier = searchSupplierLower ? productSupplierLower.includes(searchSupplierLower) : true;

      // 兩個條件都必須滿足 (邏輯 AND)
      return matchesName && matchesSupplier;
    });
    setSearchResults(filteredProducts);
  };

  // 這是一個 React Hook，它會在元件第一次渲染後執行
  // 確保當 App 元件被渲染時，ProductSearch 能接收到 initial 的產品列表
  // 當 componentDidMount 或 useEffect 搭配空依賴項陣列時，它只會執行一次
  React.useEffect(() => {
     // 初次載入時，呼叫 handleSearch 並傳遞空的搜尋條件物件，以顯示所有產品
     handleSearch({ name: '', supplier: '' });
  }, [allProducts]);

  // 新增一個函式，用於從子元件接收已提交的訂單
  const handleAddOrder = (newOrder) => {
    // 給訂單一個唯一的 ID (實際應用中可能由後端生成)
    const orderWithId = { ...newOrder, id: `order-${Date.now()}` };
    setHistoricalOrders(prevOrders => [...prevOrders, orderWithId]); // 將新訂單添加到歷史訂單列表
    console.log('新訂單已添加到歷史記錄:', orderWithId);
  };

  return (
    <div className="App">
      <Header title="船務管理中心" />
      <h1>{message}</h1> {/* 顯示 message 狀態的值 */}
      <p>您可以在下方查詢貨品單價：</p> {/* 調整提示訊息 */}
      <button onClick={handleChangeMessage}>啟動系統</button> {/* 調整按鈕文字 */}

      <hr />

      {/* 將 hasSearched 狀態作為 props 傳遞給 ProductSearch 元件 */}
      <ProductSearch
        onSearch={handleSearch}
        results={searchResults}
        allProducts={allProducts}
      />

      <hr />

      <OrderForm allProducts={allProducts} onOrderSubmit={handleAddOrder} />

      <hr />
      
      <OrderHistory orders={historicalOrders} /> {/* 傳遞歷史訂單列表給 OrderHistory 元件 */}
    </div>
  );
}

export default App;