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
      <div className="flex flex-col md:flex-row justify-center items-center mt-10">
            <div className="max-w-lg md:max-w-xl mb-5 md:mb-0">
               <img
                  className="w-full h-auto"
                  src="../../public/images/peoplereading.jpg"
                  alt="Book Clubs"
               />
            </div>
            <div className="md:ml-10 mt-5 md:mt-0 flex flex-col justify-between">
               <h1>Member Login </h1>
               <form onSubmit={handleSubmit}>
                  <label>Email</label>
                  <input type='email' name="email" value={thisUser.email} onChange={handleChange}></input>

                  <label>Password</label>
                  <input type='password' name="password" value={thisUser.password} onChange={handleChange}></input>

                  <button type="submit">Login</button>
               </form>
            </div>

      </div>
    )
}

export default Login