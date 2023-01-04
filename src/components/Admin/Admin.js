import Sidebar from './Sidebar';
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from '../Header/Language';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../services/apiService';

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleSideBar = () => {
    // console.log('collapsed');
    setCollapsed(!collapsed);
  };

  const handleLogOut = async () => {
    let response = await logOut(account.email, account.refresh_token);
    if (response && response.EC === 0) {
      dispatch(doLogOut());

      toast.success(response.EM);
      navigate('/login');
    } else {
      toast.error(response.EM);
    }
  };
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={handleToggleSideBar}>
            <FaBars className="icon-header" />
          </span>

          <div className="right-side">
            <Language />
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogOut()}>Log Out</NavDropdown.Item>
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
