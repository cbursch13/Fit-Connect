// Component for navbar 
// If else function to toggle navbar for if user is logged in or not
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
           <li className="mx-1">
            <Link to="/">
              Home
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/about">
              About
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/trainers">
              Trainers
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/courses">
              Courses
            </Link>
          </li>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
          
        </ul>
      );
    }
  }

  return (
    <header className="header">
      <div className="logo-container">
          <Link to="/">
            <img src="../../FullLogo_Transparent.png" alt="FitConnect Logo" style={{ height: '80px' }} />
          </Link>
      </div>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
