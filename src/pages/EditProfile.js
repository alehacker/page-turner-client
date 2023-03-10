import { useContext, useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { LoadingContext } from "../context/loadingContext"
import { post } from "../services/authService"

function EditProfilePage() {
   const {user, setUser, books, setBooks,message } = useContext(LoadingContext)
   const navigate = useNavigate()

   const handleChange = (e) => {
      setUser((recent) => ({...recent, [e.target.name]: e.target.value}))
   }
   
   const handleSubmit = (e) =>{
      e.preventDefault()
      post(`/users/profile-edit/${user._id}`,user)
      .then((results) =>{
         console.log('editing profile===>', results.data)
         setUser(results.data)
         navigate(`/profile/${results._id}`)
      })
      .catch((err) =>{
         console.log(err)
      }) 
   }

 
   return (
      <div className="flex flex-col items-center justify-center w-full mt-10 md:flex-row">
            <div className="max-w-lg mb-5 md:max-w-xl md:mb-0">
               <img
                  className="w-full h-auto"
                  src="/images/peoplereading.jpg"
                  alt="Book Clubs"
               />
            </div>
            <div className="flex flex-col items-center justify-between mt-5 space-y-4 md:ml-10 md:mt-0">
               <h1 className="mb-2 text-xl font-bold text-green-700 text-opacity-75">Edit Profile </h1>
               <form className="flex flex-col justify-between mt-5 md:ml-10 md:mt-0" onSubmit={handleSubmit}>
                  
                  <label className="text-green-700 text-opacity-75" >First Name</label>
                  <input type='text' name="firstName" value={user.firstName} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                  
                  <label className="text-green-700 text-opacity-75">Last Name</label>
                  <input type='text' name="lastName" value={user.lastName} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                  
                  <label className="text-green-700 text-opacity-75">Email</label>
                  <input type='email' name="email" value={user.email} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>

                  <label className="text-green-700 text-opacity-75">Profile Image</label>
                     <input type='file' name="profileImage" 
                     // value={user.profileImage} 
                     onChange={handleChange} accept=".jpg, .jpeg, .png, .pdf" className="px-4 py-2 border border-green-700 border-opacity-50"></input>

                  <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit">Edit Profile</button>
                 
               </form>
            </div>
            {message && <p className="text-white bg-green-700 bg-opacity-75 error">{message}</p>}
      </div>
    )
}

export default EditProfilePage










// The code below handles the change on images with Cloudinary
// const handleFileUpload = (e) => {

//    console.log("Uploading photo...")

//      const uploadData = new FormData()
//      uploadData.append('profileImage', e.target.files[0])
//      console.log("Upload data" , uploadData, e.target.files)
//      post('/users/new-profile-photo', uploadData)
//        .then((result) => {
//          setProfileImage(result.data.profileImage)
//          console.log("This is photo", result.data)
//        })
//        .catch((err) => {
//          console.log("Upload error", err)
//        })
//  }


//  <label>
//             Profile Picture:
//             <input type="file" name="profileImage" 
//             onChange={(e) => handleFileUpload(e)}
//             // onChange={(e) => setProfileImage(e.target.value)}
//              />
//           </label>