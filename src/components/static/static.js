import { Outlet, Link } from "react-router-dom";
import './static.css';

const Static = () => {
  return (
    <>
      <div className="navbar">
        <h1 className="title">FILM BUFF</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">SEARCH</Link>
            </li>
            <li>
              <Link to="/gallery">GALLERY</Link>
            </li>
            <li><Link to="/detail/:movieId"/></li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </>
  )
};

export default Static;