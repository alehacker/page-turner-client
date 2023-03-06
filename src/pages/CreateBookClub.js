import { useState, useContext, useNavigate } from "react";
import { LoadingContext, LoadingProvider } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post } from "../services/authService";
import { API } from "../services/apiUrl";

const CreateBookClub = () => {
   const { authenticateUser } = useContext(AuthContext)
   const [ bookClub, setBookClub, user ] = useContext(LoadingProvider)

   const [ newBookClub, setNewBookClub ] = useState(
      {
       name: "",
       description: "",
       clubImg: "",
       meetingLink: "",
       schedule: "",
       creator:[],
       currentBook: [],
       bookCollection: [],
       members:[],
      }
   )

   const navigate = useNavigate()

   const handleChange = (e) => {
      setNewBookClub((recent)=>({...recent, [e.target.name]: e.target.value}))
      console.log("Creating BookClub", newBookClub)
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      post('/create-bookclub/:userId', newBookClub)
         .then((results) => {
            navigate(`/bookclubs/${results.data._id}`) // I'm not sure where to navigate once the bookclub is created. Maybe the bookclub page
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
                  src="/images/open-textbook.jpg"
                  alt="Create Book Club"
               />
            </div>
            <div className="md:ml-10 mt-5 md:mt-0 flex flex-col justify-between items-center space-y-4">
               <h1 className="text-green-700 text-opacity-75 text-xl font-bold mb-2"> Create Your Book Club </h1>
               
                  <form className="md:ml-10 mt-5 md:mt-0 flex flex-col justify-between" onSubmit={handleSubmit} >

                     <label className="text-green-700 text-opacity-75" >Book Club Name</label>
                     <input type='text' name="name" value={newBookClub.name} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>
                     
                     <label className="text-green-700 text-opacity-75">Last Name</label>
                     <input type='text' name="description" value={newBookClub.description} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>

                     <label className="text-green-700 text-opacity-75">Book Club Image</label>
                     <input type='file' name="clubImg" value={newBookClub.clubImg} onChange={handleChange} accept=".jpg, .jpeg, .png, .pdf" className="border border-green-700 border-opacity-50 px-4 py-2"></input>
                     
                     <label className="text-green-700 text-opacity-75">Meeting Link</label>
                     <input type='text' name="meetingLink" value={newBookClub.meetingLink} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>

                     <label className="text-green-700 text-opacity-75">Schedule</label>
                     <input type='text' name="schedule" value={newBookClub.schedule} onChange={handleChange} className="border border-green-700 border-opacity-50 px-4 py-2"></input>
                     

                     <button className="bg-green-700 bg-opacity-75 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-2 my-4" type="submit" >Create Book Club Now</button>
                  </form>
            </div>
      </div>
      
   )
}

export default CreateBookClub