
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserPlusIcon, UserMinusIcon, UserCircleIcon, UserIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { LoadingContext } from "../context/loadingContext"


const ProfileNavbar = () => {


   const getToken = () => {
       return localStorage.getItem("authToken")
     }


   const { user } = useContext(LoadingContext)

   // <a href="https://www.freepik.com/free-photo/blue-user-icon-symbol-website-admin-social-login-element-concept-white-background-3d-rendering_23524384.htm#query=people%20avatar&position=6&from_view=search&track=ais">Image by mamewmy</a> on Freepik


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
                             Join a Book Club
                          </Link>
                          <Link to={'/books'} className="px-3 py-2 text-sm font-medium text-green-700 rounded-md font-large hover:text-green-500">
                             Find a Book
                          </Link>
                       </div>
                    </div>


               {
                     getToken() ?
                     
                     <div className='flex items-end justify-between h-16'>
                           <div className="flex items-center flex-shrink-0 ml-auto">
                              {user && <Link to={`/create-bookclub/${user._id}`} className= "mr-4 text-green-700 text-opacity-85">Create A BookClub</Link>}
                              {user && <Link to={`/profile-edit/${user._id}`} className= "mr-4 text-green-700 text-opacity-85">Edit Profile</Link>}
                           </div>
                     </div>
                     :
                     <div className='flex items-end justify-between h-16'>
                        <div className="flex items-center flex-shrink-0 ml-auto">
                           <Link to={'/signup'} className= "mr-4 text-green-700 text-opacity-75">
                           <UserPlusIcon className="w-6 h-6 mr-2 text-green-700 text-opacity-75" />Sign Up
                           </Link>
                           <Link to={'/login'}className="mr-4 text-green-700 text-opacity-75"> 
                           <UserIcon className="w-6 h-6 mr-2 text-green-700 text-opacity-75" />Login
                           </Link>
                        </div>
                     </div> 
                  }
          
                  <div className="flex ml-4 sm:hidden">
                     <button type="button" className="text-green-700 text-opacity-75 hover:text-green-700 focus:outline-none focus:text-green-700" aria-label="Toggle menu">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                           <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                        </svg>
                     </button>
                  </div>
         </div>
     </div>


     </nav>
   )
}


export default ProfileNavbar





