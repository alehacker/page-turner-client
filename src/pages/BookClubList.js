import { useState, useContext, useNavigate, useEffect } from "react";
import { LoadingContext, LoadingProvider } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post, get  } from "../services/authService";
import { API } from "../services/apiUrl";
import { Link } from "react-router-dom";



const BookClubList = () => {
   
   const { bookClubs, getBookClubs } = useContext(LoadingContext)

   

   useEffect(() => {
      if (!bookClubs) {
         getBookClubs()
      }
   }, [])

 

   return (
      <div className="py-8 mt-8 text-green-700 text-opacity-75 bg-white">
         <h1 className="mb-8 text-4xl font-bold text-center">Book Clubs</h1>
         <div className="max-w-4xl mx-auto">
         {
            bookClubs ? 
            <div className="grid grid-cols-3 gap-4 mb-4">
               { 
                  bookClubs.map((bookClub) => (
               <div className="p-4 border border-gray-300 rounded-md" key={bookClub._id}>
               <Link to={`/bookclub-details/${bookClub._id}`} className="text-green-700 hover:text-green-500 focus:text-green-500" >
                  <h2 className="mb-2 text-2xl font-bold">{bookClub.name}</h2>      
               </Link>
                 
                  <p className="text-green-700 text-opacity-75">{bookClub.description}</p> 
               </div>
               ))
               }
            </div>          

            : 

            <h4>Loading...</h4>
         }
            
         </div>
    </div>
   )
}

export default BookClubList


