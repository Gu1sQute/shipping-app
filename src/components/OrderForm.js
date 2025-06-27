// src/components/OrderForm.js
import React, { useState, useRef } from 'react'; // 引入 useRef Hook
import { useReactToPrint } from 'react-to-print'; // 引入 useReactToPrint
import Invoice from './Invoice'; // 引入 Invoice 元件

function OrderForm({ allProducts }) {
  // 用於儲存訂單的整體狀態，包括客戶資訊和訂單品項
  const [order, setOrder] = useState({
    customerName: '',
    customerContact: '',
    items: []
  });

  // 用於暫時儲存正在被新增的單一品項的資訊
  const [currentItem, setCurrentItem] = useState({
    productId: '',
    quantity: 1,
  });

// 新增狀態來儲存已提交的訂單，用於顯示發票
const [submittedOrder, setSubmittedOrder] = useState(null);

// useRef 用於獲取要列印的元件的 DOM 引用
const componentRef = useRef();
// useReactToPrint 是一個 Hook，它返回一個列印函式
const handlePrint = useReactToPrint({
  content: () => {
    return componentRef.current;
  },
  documentTitle: '發票',
  pageStyle: '@page { size: A4; margin: 20mm; }', // 可選的列印樣式
});

  // 處理客戶資訊輸入框的變化
  const handleCustomerInfoChange = (event) => {
    const { name, value } = event.target;
    setOrder(prevOrder => ({
      ...prevOrder,
      [name]: value
    }));
  };

  // 處理當前新增品項的輸入變化 (選擇產品ID或數量)
  const handleCurrentItemChange = (event) => {
    const { name, value } = event.target;
    setCurrentItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  // 查找選定產品的詳細資訊 (名稱、單價、供應商)
  const getProductDetails = (productId) => {
    return allProducts.find(p => p.id === productId);
  };

  // 將當前品項添加到訂單列表
  const handleAddItemToOrder = (event) => {
    event.preventDefault();

    if (!currentItem.productId || currentItem.quantity <= 0) {
      alert("請選擇有效的貨品並輸入大於0的數量。");
      return;
    }

    const product = getProductDetails(currentItem.productId);
    if (!product) {
      alert("選擇的貨品不存在。");
      return;
    }

    const existingItemIndex = order.items.findIndex(item => item.productId === currentItem.productId);

    if (existingItemIndex > -1) {
      const updatedItems = order.items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + currentItem.quantity }
          : item
      );
      setOrder(prevOrder => ({ ...prevOrder, items: updatedItems }));
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        supplier: product.supplier,
        quantity: currentItem.quantity
      };
      setOrder(prevOrder => ({
        ...prevOrder,
        items: [...prevOrder.items, newItem]
      }));
    }

    setCurrentItem({ productId: '', quantity: 1 });
  };

const handleRemoveItemFromOrder = (productIdToRemove) => {
  setOrder(prevOrder => ({
    ...prevOrder,
    items: prevOrder.items.filter(item => item.productId !== productIdToRemove)
  }));
};

  // 計算訂單總價
  const calculateTotal = () => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 處理訂單提交
  const handleSubmitOrder = (event) => {
    event.preventDefault();

    if (!order.customerName.trim() || !order.customerContact.trim()) {
        alert("請輸入客戶名稱和聯絡方式。");
        return;
    }

    if (order.items.length === 0) {
        alert("訂單中必須至少有一個品項。");
        return;
    }

    console.log("提交的訂單數據:", order);
    alert("訂單已提交 (模擬提交)！查看控制台以獲取訂單詳情。");

    // 提交後，將當前訂單保存到 submittedOrder 狀態，以便顯示發票
    setSubmittedOrder({ ...order, total: calculateTotal() }); // 複製訂單數據並添加總價

    // 提交後清空表單
    setOrder({ customerName: '', customerContact: '', items: [] });
    setCurrentItem({ productId: '', quantity: 1 });
  };

  return (
    <section style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>建立新訂單</h2>
      {/* 當 submittedOrder 為空時才顯示訂單建立表單 */}
      {!submittedOrder && (
        <form onSubmit={handleSubmitOrder}>
          {/* 客戶資訊區塊 */}
          <fieldset style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
            <legend>客戶資訊</legend>
            <div>
              <label htmlFor="customerName">客戶名稱:</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={order.customerName}
                onChange={handleCustomerInfoChange}
                required
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label htmlFor="customerContact">聯絡方式:</label>
              <input
                type="text"
                id="customerContact"
                name="customerContact"
                value={order.customerContact}
                onChange={handleCustomerInfoChange}
                placeholder="電話或Email"
                required
              />
            </div>
          </fieldset>

          {/* 新增品項區塊 */}
          <fieldset style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
            <legend>新增訂單品項</legend>
            <div>
              <label htmlFor="productSelect">選擇貨品:</label>
              <select
                id="productSelect"
                name="productId"
                value={currentItem.productId}
                onChange={handleCurrentItemChange}
              >
                <option value="">--請選擇貨品--</option>
                {allProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} (供應商: {product.supplier}) - ${product.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: '10px' }}>
              <label htmlFor="quantityInput">數量:</label>
              <input
                type="number"
                id="quantityInput"
                name="quantity"
                value={currentItem.quantity}
                onChange={handleCurrentItemChange}
                min="1"
                required
              />
            </div>
            <button type="button" onClick={handleAddItemToOrder} style={{ marginTop: '15px' }}>
              添加到訂單
            </button>
          </fieldset>

          {/* 訂單品項列表 */}
          <div style={{ marginTop: '20px' }}>
            <h3>訂單明細:</h3>
            {order.items.length === 0 ? (
              <p>訂單中沒有品項。</p>
            ) : (
              <>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                  <thead>
                    <tr style={{ background: '#f2f2f2' }}>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>貨品名稱</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>供應商</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>單價</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>數量</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>小計</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.productId}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.supplier}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{item.quantity}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleRemoveItemFromOrder(item.productId)}
                            style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            刪除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 style={{ textAlign: 'right', marginTop: '15px' }}>總計: ${calculateTotal().toFixed(2)}</h3>
              </>
            )}
          </div>

          <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            提交訂單
          </button>
        </form>
      )}

      {/* 條件渲染：當有 submittedOrder 時才顯示發票 */}
      {submittedOrder && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>發票預覽</h3>
          <Invoice order={submittedOrder} ref={componentRef} />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={handlePrint} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>列印發票</button>
            <button onClick={() => setSubmittedOrder(null)} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>建立新訂單</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrderForm;