import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { post } from "../services/authService"


const Login = () => {

    const { authenticateUser } = useContext(AuthContext)

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
                console.log("Created User", results.data)
                navigate(`/profile/${results.data._id}`)
                localStorage.setItem('authToken', results.data.token )
                
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                authenticateUser()
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
               <h1 className="text-green-700 text-opacity-75 text-xl font-bold mb-2">Member Login </h1>
               <form className="md:ml-10 mt-5 md:mt-0 flex flex-col justify-between" onSubmit={handleSubmit}>
                  <label className="text-green-700 text-opacity-75">Email</label>
                  <input type='email' name="email" value={thisUser.email} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>

                  <label className="text-green-700 text-opacity-75">Password</label>
                  <input type='password' name="password" value={thisUser.password} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2" ></input>

                  <button className="bg-green-700 bg-opacity-75 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-2 my-4" type="submit">Login</button>
                  {/* <button className="bg-green-700 bg-opacity-75 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-2 my-4" type="submit" >Sign Up</button> */}
               </form>
            </div>

      </div>
    )
}

export default Login