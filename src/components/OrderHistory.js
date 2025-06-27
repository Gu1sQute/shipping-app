// src/components/OrderHistory.js
import React from 'react';

function OrderHistory({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <section style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>歷史訂單</h2>
        <p>目前沒有歷史訂單。</p>
      </section>
    );
  }

  return (
    <section style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>歷史訂單</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>訂單 ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>客戶名稱</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>總計</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>品項數量</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>日期</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.customerName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>${order.total.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{order.items.length}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{new Date(Number(order.id.split('-')[1])).toLocaleDateString()}</td> {/* 從ID中解析日期，簡化處理 */}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default OrderHistory;