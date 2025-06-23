// src/components/ProductSearch.js
import React, { useState } from 'react';

function ProductSearch({ onSearch, results, allProducts }) {
  // 狀態現在是一個物件，儲存每個搜尋欄位的關鍵字
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    supplier: ''
  });

  // 通用的輸入變化處理函式，根據 input 的 name 屬性更新對應的搜尋條件
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newSearchTerms = { ...searchTerms, [name]: value }; // 更新指定欄位的搜尋詞
    setSearchTerms(newSearchTerms);
    onSearch(newSearchTerms); // 傳遞整個搜尋條件物件給父元件
  };

  // 定義一個處理表單提交的函式
  const handleSubmit = (event) => {
    event.preventDefault(); // 阻止表單的預設提交行為（會導致頁面重新載入）
    onSearch(searchTerms); // 提交時傳遞整個搜尋條件物件
  };

  return (
    <section>
      <h2>貨品查詢</h2>
      <form onSubmit={handleSubmit}> {/* 表單提交時觸發 handleSubmit */}
        <div>
          <label htmlFor="searchName">貨品名稱:</label>
          <input
            type="text"
            id="searchName"
            name="name" // input 的 name 屬性要與 searchTerms 物件的 key 相符
            value={searchTerms.name} // 綁定到 searchTerms.name
            onChange={handleInputChange}
            placeholder="例如: 螺絲"
            style={{ marginRight: '10px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="searchSupplier">供應商名稱:</label>
          <input
            type="text"
            id="searchSupplier"
            name="supplier" // input 的 name 屬性要與 searchTerms 物件的 key 相符
            value={searchTerms.supplier} // 綁定到 searchTerms.supplier
            onChange={handleInputChange}
            placeholder="例如: A供應商"
          />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>搜尋</button>
      </form>

      {/* 顯示貨品列表 */}
      <h3>貨品清單:</h3>
      {/* 判斷要顯示的是搜尋結果還是所有貨品 */}
      {/* 如果有搜尋關鍵字，並且結果為空，顯示「沒有找到」 */}
      {/* 判斷何時顯示「沒有找到」：當至少有一個搜尋條件且結果為空時 */}
      {(searchTerms.name || searchTerms.supplier) && results.length === 0 ? (
        <p>沒有找到相關貨品。</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>貨品名稱</th>
              <th>單價</th>
              <th>供應商</th>
            </tr>
          </thead>
          <tbody>
            {/* 如果有任何搜尋條件，顯示 results；否則顯示 allProducts */}
            {((searchTerms.name || searchTerms.supplier) ? results : allProducts).map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ProductSearch;