import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { post } from "../services/authService"
import { AuthContext } from "../context/authContext"
import { LoadingContext } from "../context/loadingContext"
import { Axios } from "axios"
import { baseUrl } from "../services/baseUrl"



const SignUp = () => {
 
   const { authenticateUser } = useContext(AuthContext);
   const { message} = useContext(LoadingContext)
   const [profileImage, setProfileImage] = useState(null);
   const [isUploading, setIsUploading] = useState(false);
   const navigate = useNavigate();
   
   const [ file, setFile ] = useState([])
   

   const [ newUser, setNewUser ] = useState(
      {
       firstName: "",
       lastName: "",
       email: "",
       password: "",
      }
   )
   
   const handleChange = (e) => {
      setNewUser((recent)=>({...recent, [e.target.name]: e.target.value}))
      console.log("Changing user", newUser)
   }


   const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const response = await handleUpload();
        console.log('Line 58 -Response from HandleUpload ==>', response);
        const results = await post('/auth/signup', {...newUser, profileImage: response});
        console.log('Created User', results);
        navigate(`/profile/${results.data._id}`);
        localStorage.setItem('authToken', results.data.token);
        authenticateUser();
      } catch (err) {
        console.log(err);
      }
   };

   const handleFile = (e) => {
      setFile(e.target.files[0])
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
               <h1 className="mb-2 text-xl font-bold text-green-700 text-opacity-75"> Sign Up </h1>
               
                  <form className="flex flex-col justify-between mt-5 md:ml-10 md:mt-0" onSubmit={handleSubmit} >

                     <label className="text-green-700 text-opacity-75" >First Name</label>
                     <input type='text' name="firstName" value={newUser.firstName} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                     
                     <label className="text-green-700 text-opacity-75">Last Name</label>
                     <input type='text' name="lastName" value={newUser.lastName} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>

                     <label className="text-green-700 text-opacity-75">Email</label>
                     <input type='email' name="email" value={newUser.email} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>

                     <label className="text-green-700 text-opacity-75">Password</label>
                     <input type='password' name="password" value={newUser.password} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                     
                     <label className="text-green-700 text-opacity-75">Profile Image</label>
                     <input type='file' name="profileImage" onChange={handleFile}                   
                      className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                    
                     <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit"  >Sign Up</button> 
                  </form>
            </div>
            {message && <p className="text-white bg-green-700 bg-opacity-75 error">{message}</p>}
      </div>
      
   )
   
}

export default SignUp
