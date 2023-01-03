import NavDropdown from 'react-bootstrap/NavDropdown';

const Language = (props) => {
  return (
    <>
      <NavDropdown title="Language" id="basic-nav-dropdown2" className="languages">
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Tiếng Việt</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
