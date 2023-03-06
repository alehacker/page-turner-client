import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { post } from "../services/authService"
import { AuthContext } from "../context/authContext"


const SignUp = () => {

   const { authenticateUser } = useContext(AuthContext)

   const [ newUser, setNewUser ] = useState(
      {
       firstName: "",
       lastName: "",
       email: "",
       password: "",
       profileImage: "",
      }
   )

   const navigate = useNavigate()

   const handleChange = (e) => {
      setNewUser((recent)=>({...recent, [e.target.name]: e.target.value}))
      console.log("Changing user", newUser)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      post('/auth/signup', newUser)
         .then((results) => {
            console.log("Created User", results.data)
            navigate(`/profile/${results.data._id}`)
            localStorage.setItem('authToken', results.data.token )
            authenticateUser()
         })
         .catch((err) => {
               console.log(err)
         })    
   } 

   return (
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 w-full">

            <div className="max-w-lg md:max-w-xl mb-5 md:mb-0">
               <img
                  className="w-full h-auto"
                  src="/images/peoplereading.jpg"
                  alt="Book Clubs"
               />
            </div>
            <div className="md:ml-10 mt-5 md:mt-0 flex flex-col justify-between items-center space-y-4">
               <h1 className="text-green-700 text-opacity-75 text-xl font-bold mb-2"> Sign Up </h1>
               
                  <form className="md:ml-10 mt-5 md:mt-0 flex flex-col justify-between" onSubmit={handleSubmit} >

                     <label className="text-green-700 text-opacity-75" >First Name</label>
                     <input type='text' name="firstName" value={newUser.firstName} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>
                     
                     <label className="text-green-700 text-opacity-75">Last Name</label>
                     <input type='text' name="lastName" value={newUser.lastName} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>

                     <label className="text-green-700 text-opacity-75">Email</label>
                     <input type='email' name="email" value={newUser.email} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>

                     <label className="text-green-700 text-opacity-75">Password</label>
                     <input type='password' name="password" value={newUser.password} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>
                     
                     <label className="text-green-700 text-opacity-75">Profile Image</label>
                     <input type='file' name="profileImage" value={newUser.profileImage} onChange={handleChange} accept=".jpg, .jpeg, .png, .pdf" className="border border-green-700 border-opacity-50 px-4 py-2"></input>

                     <button className="bg-green-700 bg-opacity-75 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-2 my-4" type="submit" >Sign Up</button>
                  </form>
            </div>
      </div>
      
   )
   
}

export default SignUp