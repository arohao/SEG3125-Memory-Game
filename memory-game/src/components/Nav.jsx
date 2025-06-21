import logo from '../assets/logo.svg';
import { NavLink, Link } from 'react-router';

function Nav() {
  return (
    <nav className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
      <a href="/" className="d-flex align-items-center text-decoration-none">
        <img src={logo} alt="Logo" width="40" height="40" className="me-2 logo"/>
        <span className="fs-4 fw-bold">Memory Game</span>
      </a>
      <ul className="d-flex list-unstyled mb-0 align-items-center">
        <li className="ms-4">
          <NavLink to='/how-to-play' className="text-dark text-decoration-none fw-bold">How to Play</NavLink>
        </li>
        <li className="ms-4">
          <NavLink to='/leaderboard' className="text-dark text-decoration-none fw-bold">Leaderboard</NavLink>
        </li>
        <li className="ms-4">
          <button className="btn btn-primary fw-bold">Start</button>
        </li>
      </ul>
    </nav>
  );

}

export default Nav;