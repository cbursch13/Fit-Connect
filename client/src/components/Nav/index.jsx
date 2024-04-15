import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
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
        <h1 className="logo">
          <Link to="/">
            <img src="../../FullLogo_Transparent.png" alt="FitConnect Logo" style={{ height: '80px' }} />
          </Link>
        </h1>
      </div>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
