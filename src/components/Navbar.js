
import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlusIcon, UserMinusIcon, UserCircleIcon, UserIcon, BookOpenIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  return (
    <nav className="bg-white shadow w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between h-16">
               <div className='flex items-start justify-between h-16'>
                  <BookOpenIcon className="h-8 w-8 text-green-700 text-opacity-75 mr-2" />
                  <Link to={'/'} className="font-large text-green-700 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">
                     The Page Turner's Lounge
                  </Link>
                  <div className="hidden sm:flex sm:items-baseline sm:ml-4 sm:space-x-4">
                     <Link to={'/bookclubs'} className="font-large text-green-700 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">
                        Join a Book Club
                     </Link>
                     <Link to={'/books'} className="font-large text-green-700 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">
                        Find a Book
                     </Link>
                  </div>
               </div>
               
               <div className='flex items-end justify-between h-16'>
                  <div className="flex-shrink-0 flex items-center ml-auto">
                     <Link to={'/signup'} className= "text-green-700 text-opacity-75 mr-4"> 
                     <UserPlusIcon className="h-6 w-6 text-green-700 text-opacity-75 mr-2" />Sign Up
                     </Link>
                     <Link to={'/login'}className="text-green-700 text-opacity-75 mr-4">  
                     <UserIcon className="h-6 w-6 text-green-700 text-opacity-75 mr-2" />Login
                     </Link>
                  </div>
               </div>

               <div className="flex sm:hidden ml-4">
                  <button type="button" className="text-green-700 text-opacity-75 hover:text-green-700 focus:outline-none focus:text-green-700" aria-label="Toggle menu">
                     <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                     </svg>
                  </button>
               </div>
         </div>
      </div>
   </nav>
  );
};

export default Navbar;

