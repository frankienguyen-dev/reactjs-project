import Sidebar from './Sidebar';
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from '../Header/Language';

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
          <span onClick={handleToggleSideBar}>
            <FaBars className='icon-header' />
          </span>

          <div className='right-side'>
            <Language />
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Log Out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>

        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Admin;
