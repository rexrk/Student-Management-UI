import { useParams, Link } from "react-router-dom";
import { useAuth } from './security/AuthContext'

function WelcomeComponent() {
  const { username } = useParams();
  const { id } = useAuth();

  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage Account - <Link to={`/my-account/${id}`}> Click here</Link>
      </div>
    </div>
  );
}
export default WelcomeComponent;