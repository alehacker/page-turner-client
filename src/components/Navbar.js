
import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserPlusIcon, UserMinusIcon, UserCircleIcon, UserIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../context/authContext';
import { LoadingContext } from '../context/loadingContext';


const Navbar = () => {
   const { logout} = useContext(AuthContext)
   

   const { user, message, setTimedMessage } = useContext(LoadingContext) 
   
   setTimedMessage(message)

   
      let token = localStorage.getItem("authToken")
   

 
    return (
    <nav className="w-full bg-white shadow">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between h-16">
        
               <div className='flex items-start justify-between h-16'>
                  <BookOpenIcon className="w-8 h-8 mr-2 text-green-700 text-opacity-75" />
                  <Link to={'/'} className="px-3 py-2 text-sm font-medium text-green-700 rounded-md font-large hover:text-green-500">
                     The Page Turner's Lounge
                  </Link>
                  <div className="hidden sm:flex sm:items-baseline sm:ml-4 sm:space-x-4">
                     <Link to={'/bookclubs'} className="px-3 py-2 text-sm font-medium text-green-700 rounded-md font-large hover:text-green-500">
                        Check All Book Clubs
                     </Link>
                     <Link to={'/books'} className="px-3 py-2 text-sm font-medium text-green-700 rounded-md font-large hover:text-green-500">
                        Find a Book
                     </Link>
                  </div>
               </div>

               <div className='flex items-end justify-between h-16'> 
                  <div className="flex items-center flex-shrink-0 ml-auto">
                   { token && (
                     <>
                     <Link to={'/profile/:userId'}className="mr-4 text-green-700 text-opacity-75">  
                     <UserCircleIcon className="w-6 h-6 mr-2 text-green-700 text-opacity-75" />Profile
                     </Link>
                     <Link to={'/'}onClick={logout} className="mr-4 text-green-700 text-opacity-75">  
                     <UserMinusIcon className="w-6 h-6 mr-2 text-green-700 text-opacity-75" />Logout
                     </Link>
                     {/* <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-transparent bg-opacity-75 border border-green-700 rounded hover:bg-green-500" onClick={logout}>Logout</button> */}

                        
                     </>
                   )}

                   { !token && (
                     <>
                     <Link to={'/signup'} className= "mr-4 text-green-700 text-opacity-75"> 
                     <UserPlusIcon className="w-6 h-6 mr-2 text-green-700 text-opacity-75" />Sign Up
                     </Link>
                     <Link to={'/login'}className="mr-4 text-green-700 text-opacity-75">  
                     <UserIcon className="w-6 h-6 mr-2 text-green-700 text-opacity-75" />Login
                     </Link>
                     </>
                  )}
                     
                     
                     
                  </div>
               </div>


   
              
               <div className="flex ml-4 sm:hidden">
                  <button type="button" className="text-green-700 text-opacity-75 hover:text-green-700 focus:outline-none focus:text-green-700" aria-label="Toggle menu">
                     <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                     </svg>
                  </button>
                  <div className="hidden sm:block sm:ml-4 sm:space-x-4">
                     <Link to={'/bookclubs'} className="px-3 py-2 text-sm font-medium text-green-700 rounded-md font-large hover:text-green-500">
                        Check All Book Clubs
                     </Link>
                     <Link to={'/books'} className="px-3 py-2 text-sm font-medium text-green-700 rounded-md font-large hover:text-green-500">
                        Find a Book
                     </Link>
                  </div>
               </div>
         </div>
      </div>
   </nav>
  );
};

export default Navbar;









