import { useState, useContext, useNavigate } from "react";
import { LoadingContext, LoadingProvider } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post, get  } from "../services/authService";
import { API } from "../services/apiUrl";


const BookClubList = () => {
   
   const { bookClubs} = useContext(LoadingContext)

 

   return (
      <div>
         <h1>Book Clubs</h1>
         {bookClubs.map((bookClub) => (
         <div key={bookClub.id}>
            <h2>{bookClub.name}</h2>
            <p>{bookClub.description}</p>
         </div>
         ))}
    </div>
   )
}

export default BookClubList