import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2x1 mx-auto px-4 flex items-center justify-between">
        <ul className="nav__links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/pages">Pages</Link>
          </li>
          <li>
            <Link to="/contact">contact</Link>
          </li>
        </ul>
        {/*logo*/}
        <div className="nav__logo">
          <Link to="/">
            Lebaba<span>.</span>
          </Link>
        </div>
        {/*nav icon*/}
        <div className="nav__icon relative">
          <Link></Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
