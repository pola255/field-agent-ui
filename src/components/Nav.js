import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Agent</Link>
        </li>
        <li>
          <Link to="/alias">Alias</Link>
        </li>
        <li>
          <Link to="/agency">Agency</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;