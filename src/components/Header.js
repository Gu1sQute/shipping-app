// src/components/Header.js

import React from 'react'; // 在舊版本 React 中，引入 React 是必須的，儘管在較新版本中可以省略，但為了習慣保持引入是個好習慣。

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <a href="#dashboard">儀表板</a> | <a href="#ships">船舶管理</a> | <a href="#bookings">訂艙管理</a>
      </nav>
    </header>
  );
}

export default Header;