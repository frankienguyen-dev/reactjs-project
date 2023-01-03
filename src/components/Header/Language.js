import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';

const Language = (props) => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguages = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === 'vi' ? 'Tiếng Việt' : 'English'}
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguages('en')}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguages('vi')}>Tiếng Việt</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
