import {Link, useNavigate} from 'react-router-dom';
import {useCart} from '../context/CardContext.jsx';
import { clearTokens, getAccessToken } from '../utils/auth.js';

function Navbar() {
    const {cartItems} = useCart();
    const navigate = useNavigate();
    
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    };
    return (
        <nav className='bg-white shadow-md px-6 py-6 flex justify-between items-center fixed w-full top-0 z-50'>
            <Link to='/' className='text-2xl font-bold  text-amber-500'>
             🛍️ ShoppingCart
            </Link>

            <div className='flex items-center gap-6'>
                {/* Login/SignUp or Logout */}
                {!isLoggedIn ? (
                    <>
                        <Link to='/login' className='text-gray-800 text-xl relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:uppercase hover:text-amber-500'>
                            Login
                        </Link>
                        <Link to='/signup' className='text-gray-800  text-xl  hover:after:w-full hover:uppercase hover:text-amber-500'>
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className='text-gray-800 text-xl cursor-pointer hover:after:w-full hover:uppercase hover:text-amber-500 pointer'>
                        Logout
                    </button>
                )}
            </div>

           <Link
  to='/cart'
  className='group relative flex items-center gap-1 text-gray-800 text-xl
             hover:text-amber-500 transition-colors duration-300 hover:uppercase'>
    {/* SVG cart icon — responds to currentColor */}
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='w-6 h-6 text-gray-800 group-hover:text-amber-500 transition-colors duration-300'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round'
      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z'
    />
  </svg>


 Cart
  {cartCount > 0 && (
    <span className='absolute -top-2 -right-3 bg-red-500 text-white
                     text-xs font-bold rounded-full px-2
                     group-hover:scale-125 transition-transform duration-300 hover:text-amber-500 '>
      {cartCount}
    </span>
  )}
</Link>
        </nav>
    )
}

export default Navbar;