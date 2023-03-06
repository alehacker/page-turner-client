import { get } from "../services/authService"
import { useState, useEffect, useContext} from "react"
import { LoadingContext, LoadingProvider } from "../context/loadingContext"




const UserProfile = () => {
   const [user, setUser] = useContext(LoadingProvider)
   console.log('Book Collection', user?.bookCollection)

  return (
   <div className="mx-auto max-w-2xl">
      {user && (
        <>
          <div className="flex flex-col items-center bg-gray-100 p-4">
               <img className="w-20 h-20 rounded-full object-cover mb-2" src='user.profileImage' alt='/images/profile.png'></img>
               <h2 className=" text-green-700 text-opacity-75 text-xl font-bold">{user.firstName} {user.lastName}</h2>
               <p className="text-green-700">Email: {user.email}</p>
          </div>

          <div className="bg-white p-4 mt-4">
               <div className="mb-4">
                  <h2 className=" text-green-700 text-opacity-75 text-lg font-bold mb-2">Book Clubs I Belong</h2>
                  <ul>
                  {user.bookClubs.map((club) => (
                     <li key={club.id}>{club.name}</li>
                  ))}
                  </ul>
               </div>
               <div>
                  <h2 className=" text-green-700 text-opacity-75 text-lg font-bold mb-2">Books I Like</h2>
                  <ul>
                  {user.bookCollection.map((bookId) => (
                     <li key={bookId}>{bookId}</li>
                  ))}
                  </ul>
               </div>
          </div>
        </>
      )}
    </div>
    
  )
}

export default UserProfile