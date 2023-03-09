
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserPlusIcon, UserMinusIcon, UserCircleIcon, UserIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { LoadingContext } from "../context/loadingContext"


const Footer = () => {


   // <a href="https://www.freepik.com/free-photo/blue-user-icon-symbol-website-admin-social-login-element-concept-white-background-3d-rendering_23524384.htm#query=people%20avatar&position=6&from_view=search&track=ais">Image by mamewmy</a> on Freepik


   return (
      <footer className="w-full py-6 bg-white shadow ">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <p className="text-green-300">&copy; 2023 Page Turners Lounge. All Rights Reserved.</p>
        </div>
      </footer>
    );
}


export default Footer






