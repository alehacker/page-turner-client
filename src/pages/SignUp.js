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
      <div>
            <div>

               <h1>Signup</h1>

            </div>
            
            <div>
               <form onSubmit={handleSubmit} >

                  <label>First Name</label>
                  <input type='text' name="firstName" value={newUser.firstName} onChange={handleChange}> </input>
                  
                  <label>Last Name</label>
                  <input type='text' name="lastName" value={newUser.lastName} onChange={handleChange}></input>

                  <label>Email</label>
                  <input type='email' name="email" value={newUser.email} onChange={handleChange}></input>

                  <label>Password</label>
                  <input type='password' name="password" value={newUser.password} onChange={handleChange}></input>
                  
                  <label>Profile Image</label>
                  <input type='file' name="profileImage" value={newUser.profileImage} onChange={handleChange} accept=".jpg, .jpeg, .png, .pdf"></input>

                  <button type="submit">Sign Up</button>
               </form>
            </div>
      </div>
      
   )
   
}

export default SignUp