import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <div className="homepage-video">
        <video autoPlay muted loop>
          <source src={videoHomepage} type="video/mp4" />
        </video>
      </div>

      <div className="homepage-content">
        <div className="homepage-title">{t('homepage.title1')}</div>
        <div className="homepage-description">{t('homepage.title2')}</div>
        <div className="homepage-button">
          {isAuthenticated === true ? (
            <button onClick={() => navigate('/users')}>{t('homepage.title3')}</button>
          ) : (
            <button onClick={() => navigate('/login')}>{t('homepage.title4')}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
