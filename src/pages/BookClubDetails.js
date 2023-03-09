import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { LoadingContext} from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post, get  } from "../services/authService";
import { API } from "../services/apiUrl";
import { Link } from "react-router-dom";



function BookClubDetails ({ title }) {
   const navigate = useNavigate()
   const { authenticateUser } = useContext(AuthContext)
   const { bookClub, setBookClub,  user,  setUser, getBookClub, onDeleteClick } = useContext(LoadingContext)

   const { bookclubId } = useParams()

   const checkCreator = (bookClubCreator, userId) =>{
      return (bookClubCreator === userId)
   }
 

   useEffect(() => {
      if (!bookClub) {
         getBookClub(bookclubId)
      }
  }, [])

      console.log("This is the book club ===>", bookClub)
      
  return (
   <div className="p-4 mt-5 text-green-700 text-opacity-75 bg-white rounded-lg shadow-lg">
      <h1  className="mb-2 text-2xl font-bold">{title}</h1>
      {
         bookClub ?
         <> 
            <h2  className="mb-2 text-lg font-semibold">{bookClub.name}</h2>
            {bookClub.clubImg ? 
                     <img src={bookClub.clubImg} alt="Club Photo" className="w-48 h-auto mb-2"/>
               : <p className="mb-2">Image not available</p>
            }
            <p className="mb-1">Description: {bookClub.description}</p>
            <p className="mb-1">Meeting Link: {bookClub.meetingLink}</p>
            <p className="mb-1">Schedule: {bookClub.schedule}</p>
            <p className="mb-1">We are Reading Now: {bookClub.currentBook}</p>  
            
            <div>
                  <h2 className="mb-2 text-lg font-bold text-green-700 text-opacity-75 ">Books We Read</h2>
                  <ul className="grid grid-cols-3 gap-4 text-green-700 text-opacity-75">
                     {bookClub.bookCollection ? bookClub.bookCollection.map((book) => (
                        <li key={book._id} className="p-4 bg-white rounded-lg shadow-md">
                        <img src={book.bookImg} alt={book.title}  className="object-contain w-full h-48" />                     
                        <h3  className="mb-2 text-lg font-bold">{book.title}</h3>                     
                        <p className="mb-2">{book.author}</p>
                        <p className="mb-2">{book.pages} pages</p>
                        <p className="mb-2">Published: {book.publishedDate}</p>
                        </li>
                     )) : <p className="mb-1">no book Collection yet</p>}
                  </ul>
               </div>
         
               {
                  bookClub && 
                  <>

                  {
                  user ? 

               <Link to={`/add-bookclub/${bookClub._id}/${user._id}`} className="text-green-700 hover:text-green-500 focus:text-green-500" >
                  <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit">Join Book Club</button>      
               </Link>

               : <h4>Loading...</h4>
                  }
                     
                  </>
                  
               }
                                  
               { 
                  user && (checkCreator(bookClub.creator._id, user._id)) && <Link to={`/edit-bookclub/${bookClub._id}/${user._id}`} className="text-green-700 hover:text-green-500 focus:text-green-500" >
                     <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit">Edit Book Club</button>      
                     </Link>
               }                    
                 { user && (checkCreator(bookClub.creator._id, user._id)) && 
                 
                     <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" onClick={() =>{onDeleteClick(bookClub._id)}}>Delete Book Club</button>      
                     
               }
         </>

         :  
         <h4 className="mb-2 text-lg font-bold text-green-700 text-opacity-75 ">Loading...</h4>
         
      }
   
   </div>
  )
}

export default BookClubDetails