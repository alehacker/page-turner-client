import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { LoadingContext } from "../context/loadingContext"
import { post } from "../services/authService"


const Login = () => {

    const { authenticateUser } = useContext(AuthContext)
    
    const { user, setUser, message } = useContext(LoadingContext)
    
    const [ thisUser, setthisUser ] = useState(
        {
            email: "",
            password: ""
        }
    )

    const navigate = useNavigate()

    const handleChange = (e) => {
        setthisUser((recent)=>({...recent, [e.target.name]: e.target.value}))
        console.log("Changing user", thisUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/login', thisUser)
            .then((results) => {
                console.log("LoggedIn User -->", results.data)
                localStorage.setItem('authToken', results.data.token )
                setUser(results.data)
                navigate(`/profile/${results.data.foundUser._id}`)
               })
               .catch((err) => {
                  console.log("we have an error", err)
               })
               .finally(() => {
                  authenticateUser()
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
               <h1 className="mb-2 text-xl font-bold text-green-700 text-opacity-75">Member Login </h1>
               <form className="flex flex-col justify-between mt-5 md:ml-10 md:mt-0" onSubmit={handleSubmit}>
                  <label className="text-green-700 text-opacity-75">Email</label>
                  <input type='email' name="email" value={thisUser.email} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>

                  <label className="text-green-700 text-opacity-75">Password</label>
                  <input type='password' name="password" value={thisUser.password} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50" ></input>

                  <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit">Login</button>
                 
               </form>
            </div>
            {message && <p className="text-white bg-green-700 bg-opacity-75 error">{message}</p>}
      </div>
    )
}

export default Login