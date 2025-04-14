import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartModal from "../pages/shop/CartModal";
import { useNavigate } from "react-router";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen] = useState(false)
  const handleCartToggle = () => {
    setisCartOpen(!isCartOpen)
  }

  //^ show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();


  //^ dropdown menus
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  //^ admin dropdown menu
  const adminDropdownMenu = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "add New Post", path: "/dashboard/add-new-post" },
  ]
  //^ user dropdown menu
  const userDropdownMenu = [
    { label: "Painel", path: "/dashboard" },
    { label: "Perfil", path: "/dashboard/profile" },
    { label: "Pagamento", path: "/dashboard/payments" },
    { label: "Pedidos", path: "/dashboard/orders" },
  ]

  const dropdownMenu = user?.role === "admin" ? [...adminDropdownMenu] : [...userDropdownMenu]
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (error) {
      console.log("failed to logout", error);
    }
  }



  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2x1 mx-auto  flex justify-between items-center">
        <ul className="nav__links ">
          <li className="link">
            <Link to="/">Início</Link>
          </li>
          <li className="link">
            <Link to="/shop">Loja</Link>
          </li>
          <li className="link">
            <Link to="/pages">Páginas</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contato</Link>
          </li>
        </ul>
        {/*logo*/}
        <div className="nav__logo">
          <Link to="/">
            Fashion<span>.</span>
          </Link>
        </div>

        {/*nav icon*/}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleCartToggle}
              className="hover-text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center w-5">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {
              user && user ? (<>
                <img
                  onClick={handleDropdownToggle}
                  src={user?.profileImage || avatarImg} alt=""
                  className="size-6 rounded-full cursor-pointer " />

                {
                  isDropdownOpen && (
                    <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <ul className="font-medium space-y-4 p-2">
                        {
                          dropdownMenu.map((menu, index) => (
                            <li key={index}>
                              <Link
                                onClick={() => setIsDropdownOpen(false)}
                                className="dropdown-item"
                                to={menu.path}>{menu.label}</Link>
                            </li>
                          ))}
                        <li>
                          <Link
                            onClick={handleLogout}
                            className="dropdown-item"
                            >Sair</Link>
                        </li>
                      </ul>
                    </div>
                  )
                }

              </>) : (<Link to="/login">
                <i className="ri-user-line"></i>
              </Link>)
            }

          </span>
        </div>
      </nav>
      {
        isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
      }
    </header>
  );
};

export default Navbar;
