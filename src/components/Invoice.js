// src/components/Invoice.js
import React, { forwardRef } from 'react'; // 引入 forwardRef

// 使用 forwardRef 包裹 Invoice 元件，並接收 ref 作為第二個參數
const Invoice = forwardRef(({ order }, ref) => { // Invoice 元件現在接收 ref
  if (!order || !order.customerName) {
    return <p>請選擇有效的訂單進行發票預覽。</p>;
  }

  const calculateTotal = () => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    // 將 ref 應用到最外層的 div 元素
    <div ref={ref} style={{ padding: '30px', border: '1px solid #000', margin: '20px auto', maxWidth: '800px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>發票 (Invoice)</h2>

      {/* 公司資訊 */}
      <div style={{ marginBottom: '20px' }}>
        <p><strong>公司名稱:</strong> 你的貿易公司名稱</p>
        <p><strong>地址:</strong> 你的公司地址</p>
        <p><strong>電話:</strong> 你的公司電話</p>
        <p><strong>Email:</strong> 你的公司Email</p>
      </div>

      <hr style={{ borderTop: '1px dashed #ccc', margin: '20px 0' }} />

      {/* 客戶資訊 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>客戶資訊:</h3>
        <p><strong>客戶名稱:</strong> {order.customerName}</p>
        <p><strong>聯絡方式:</strong> {order.customerContact}</p>
        <p><strong>訂單日期:</strong> {new Date().toLocaleDateString()}</p>
      </div>

      {/* 訂單明細 */}
      <h3 style={{ marginBottom: '10px' }}>訂單明細:</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>貨品名稱</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>供應商</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>單價</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>數量</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>小計</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* 總計 */}
      <div style={{ textAlign: 'right', fontSize: '1.2em' }}>
        <p><strong>總計: ${calculateTotal().toFixed(2)}</strong></p>
      </div>

      <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '0.9em', color: '#666' }}>感謝您的訂單！</p>
    </div>
  );
}); // forwardRef 的結束括號

export default Invoice;