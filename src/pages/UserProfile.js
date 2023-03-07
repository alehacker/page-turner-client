import { get } from "../services/authService"
import { useState, useEffect, useContext} from "react"
import { LoadingContext, LoadingProvider } from "../context/loadingContext"




const UserProfile = () => {
   const {user, setUser} = useContext(LoadingContext)
   
   console.log('Book Collection', user?.bookCollection)

  return (
   <div className="max-w-2xl mx-auto">
      {user && (
        <>
          <div className="flex flex-col items-center p-4 bg-gray-100">
               <img className="object-cover w-20 h-20 mb-2 rounded-full" src='user.profileImage' alt='/images/profile.png'></img>
               <h2 className="text-xl font-bold text-green-700 text-opacity-75 ">{user.firstName} {user.lastName}</h2>
               <p className="text-green-700">Email: {user.email}</p>
          </div>

          <div className="p-4 mt-4 bg-white">
               <div className="mb-4">
                  <h2 className="mb-2 text-lg font-bold text-green-700 text-opacity-75 ">Book Clubs I Belong</h2>
                  <ul>
                  { user.bookClubs? user.bookClubs.map((club) => (
                     <li key={club.id}>{club.name}</li>
                  )): <p>no book clubs yet</p>}
                  </ul>
               </div>
               <div>
                  <h2 className="mb-2 text-lg font-bold text-green-700 text-opacity-75 ">Books I Like</h2>
                  <ul>
                  { user.bookCollection? user.bookCollection.map((bookId) => (
                     <li key={bookId}>{bookId}</li>
                  )) : <p>no book Collection yet</p>}
                  </ul>
               </div>
          </div>
        </>
      )}
    </div>
    
  )
}

export default UserProfile