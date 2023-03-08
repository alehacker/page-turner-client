import { useState, useContext, useNavigate, useEffect } from "react";
import { LoadingContext, LoadingProvider } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post, get  } from "../services/authService";
import { API } from "../services/apiUrl";


const BookClubList = () => {
   
   const { bookClubs, getBookClubs } = useContext(LoadingContext)

   

   useEffect(() => {
      if (!bookClubs) {
         getBookClubs()
      }
   }, [])

 

   return (
      <div className="py-8 mt-8 text-green-700 text-opacity-75 bg-gray-100">
         <h1 className="mb-8 text-4xl font-bold text-center">Book Clubs</h1>
         <div className="max-w-4xl mx-auto">
         {
            bookClubs ? 
            <>
               { 
                  bookClubs.map((bookClub) => (
               <div className="p-6 mb-4 bg-white rounded-lg shadow" key={bookClub._id}>
                  <h2 className="mb-2 text-2xl font-bold">{bookClub.name}</h2>
                  <p className="text-green-700 text-opacity-75">{bookClub.description}</p> 
               </div>
               ))
               }
            </>          

            : 

            <h4>Loading...</h4>
         }
            
         </div>
    </div>
   )
}

export default BookClubList