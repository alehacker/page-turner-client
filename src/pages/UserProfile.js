import { get } from "../services/authService"
import { useState, useEffect, useContext} from "react"
import { LoadingContext, LoadingProvider } from "../context/loadingContext"
import { Link } from "react-router-dom"




const UserProfile = () => {
   const {user, setUser, books, setBooks,bookclub, setBookClub } = useContext(LoadingContext)
   
   console.log('here is the user -->', user)
   // console.log('The whole Users collection', user.bookCollection)
   
  
  return (
   <div className="max-w-2xl mx-auto mt-5">
      {user && (
        <>
          <div className="flex flex-col items-center p-4 bg-gray-100">
               <img className="object-cover w-20 h-20 mb-2 rounded-full" src='user.profileImage' alt='Profile'></img>
               <h2 className="text-xl font-bold text-green-700 text-opacity-75 ">{user.firstName} {user.lastName}</h2>
               <p className="text-green-700">Email: {user.email}</p>
               <Link to={`/create-bookclub/${user._id}`}
                  className="w-1/2 py-2 my-4 mr-2 font-bold text-center text-white bg-green-700 bg-opacity-75 rounded px-42 bg-gray-200reen-700 text hover:bg-green-500"
               > Create A Book Club
               </Link> 
               <Link to={`/profile-edit/${user._id}`}
                  className="w-1/4 px-4 py-2 my-4 mr-2 font-bold text-center text-white bg-green-700 bg-opacity-75 rounded bg-gray-200reen-700 text hover:bg-green-500"
               > Edit Profile
               </Link>
          </div>

          <div className="p-4 mt-4 bg-white">
               <div className="mb-4">
                  <h2 className="mb-2 text-lg font-bold text-green-700 text-opacity-75 ">Book Clubs I Belong</h2>
                  <ul>                 
                     {
                        user.bookClubs? user.bookClubs.map((club) => (
                        
                           <li className="mb-2 text-green-700 text-opacity-75" key={club.id}>{club.name}</li>    
                        
                     )): <p className="mb-2">no book clubs yet</p>}
                  </ul>

               </div>
               <div>
                  <h2 className="mb-2 text-lg font-bold text-green-700 text-opacity-75 ">Books I Like</h2>
                  <ul className="grid grid-cols-3 gap-4 text-green-700 text-opacity-75">
                     {user.bookCollection ? user.bookCollection.map((book) => (
                        <li key={book._id} className="p-4 bg-white rounded-lg shadow-md">
                        <img src={book.bookImg} alt={book.title}  className="object-contain w-full h-48" />                     
                        <h3  className="mb-2 text-lg font-bold">{book.title}</h3>                     
                        <p className="mb-2">{book.author}</p>
                        <p className="mb-2">{book.pages} pages</p>
                        <p className="mb-2">Published: {book.publishedDate}</p>
                        </li>
                     )) : <p className="mb-2">no book Collection yet</p>}
                  </ul>
               </div>

          </div>
        </>
      )}
    </div>
    
  )
}

export default UserProfile

{/* <Link to={`/book-details/${book.id}`} >
   <h3  className="mb-2 text-lg font-bold">{book.title}</h3>
</Link> */}

 //***this link is not working***  The problem might be the club.id not 'translating' into the bookclubId used on that route//
{/* <ul>
                  
{
   user.bookClubs? user.bookClubs.map((club) => (
   <Link to={`/bookclub-details/${user.bookClubs[club]}`} className="text-green-700 hover:text-green-500 focus:text-green-500" >
      <li className="mb-2 text-l" key={club.id}>{club.name}</li>    
   </Link> //***this link is not working***  The problem might be the club.id not 'translating' into the bookclubId used on that route//
   
)): <p className="mb-2">no book clubs yet</p>}
</ul> */}