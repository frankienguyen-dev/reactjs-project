import Sidebar from './Sidebar';
import './Admin.scss';
import { FaBars } from 'react-icons/fa';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSideBar = () => {
    // console.log('collapsed');
    setCollapsed(!collapsed);
  };
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars style={{ margin: 20 }} onClick={handleToggleSideBar} />
        </div>

        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
