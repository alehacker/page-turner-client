import { useContext, useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { LoadingContext } from "../context/loadingContext"
import { post } from "../services/authService"
import axios from "axios"

function EditProfilePage() {
   const {user, setUser, message } = useContext(LoadingContext)
   const { authenticateUser } = useContext(AuthContext) 
   
   const navigate = useNavigate()
   
   const [ file, setFile ] = useState([])
   
   const handleChange = (e) => {
      setUser((recent) => ({...recent, [e.target.name]: e.target.value}))
  }

  const handleFile = (e) => {
   setFile(e.target.files[0])
}
   
   const handleSubmit = (e) =>{
      e.preventDefault()
      
      handleUpload()
      .then((response) => {
         console.log('Here is the Profile Image ===>>', response )
         post(`/users/profile-edit/${user._id}`,{...user, profileImage: response})
         .then((results) =>{
            console.log('Here is the users Profile Image ===>>', results)
            console.log('editing profile===>', results.data)
            
            setUser(results.data)
            console.log ("EDITED USER", user)
            navigate(`/profile/${results._id}`)
         })
         .catch((err) =>{
            console.log(err)
         })
         .finally(() => {
            authenticateUser()
         })
      })
      .catch((err) =>{
         console.log(err)
      })
   }

   const handleUpload =  async() => {
      try {
         const uploadData = new FormData()
         uploadData.append('profileImage', file)
         const response = await post('/auth/upload-photo', uploadData)
         console.log('Here is the response ===>',response)
         return(response.data.url)
     } catch (error) {
         console.log(error)
     }
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
               {user &&
                  <>
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
                           onChange={handleFile}  className="px-4 py-2 border border-green-700 border-opacity-50"></input>

                        <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit">Edit Profile</button>
                     
                     </form>
                     
                  </>
               }
            </div>
            {message && <p className="text-white bg-green-700 bg-opacity-75 error">{message}</p>}
      </div>
    )
}

export default EditProfilePage
