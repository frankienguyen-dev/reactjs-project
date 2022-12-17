import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  return (
    <div className="homepage-container">
      <div className="homepage-video">
        <video autoPlay muted loop>
          <source src={videoHomepage} type="video/mp4" />
        </video>
      </div>

      <div className="homepage-content">
        <div className="homepage-title">There's a better way to ask</div>
        <div className="homepage-description">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </div>
        <div className="homepage-button">
          <button>Get started - it's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
