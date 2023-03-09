
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserPlusIcon, UserMinusIcon, UserCircleIcon, UserIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { LoadingContext } from "../context/loadingContext"


const Footer = () => {


   // <a href="https://www.freepik.com/free-photo/blue-user-icon-symbol-website-admin-social-login-element-concept-white-background-3d-rendering_23524384.htm#query=people%20avatar&position=6&from_view=search&track=ais">Image by mamewmy</a> on Freepik


   return (
      <footer className="py-6 bg-white shadow">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <p className="text-gray-300">&copy; 2023 Page Turners Lounge. All Rights Reserved.</p>
          <ul className="flex list-none">
            <li className="mr-4"><a href="#" className="text-gray-300 hover:text-white">Terms of Use</a></li>
            <li className="mr-4"><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
          </ul>
        </div>
      </footer>
    );
}


export default Footer






