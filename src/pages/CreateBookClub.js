import { useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { LoadingContext } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import { post } from "../services/authService";
import { API } from "../services/apiUrl";

const CreateBookClub = () => {
   const { authenticateUser } = useContext(AuthContext)

   const navigate = useNavigate()
   
   const { bookClub, setBookClub, user, bookClubs, setBookClubs, setUser, getBookClubs }   = useContext(LoadingContext)

   const [ newBookClub, setNewBookClub ] = useState(
      {
       name: "",
       description: "",
       clubImg: "",
       meetingLink: "",
       schedule: "",
       creator:"" || user?._id,
       currentBook: [],
       bookCollection: [],
       members:[],
      }
   )

   

   const handleChange = (e) => {
      setNewBookClub((recent)=>({...recent, [e.target.name]: e.target.value}))
      console.log("Creating BookClub", newBookClub)
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      post(`/bookclubs/create-bookclub/${user._id}`, newBookClub)
         .then((results) => {
            console.log('results--->', results)
            if (!bookClubs) {
               navigate('/bookclubs') 
               return
            } else {
               
               let newBookClubs = [...bookClubs]
               newBookClubs.unshift(results.data)
               setBookClubs(newBookClubs)
               console.log('newbookclubs ==>', bookClubs)
               
               let newUser = Object.assign({}, user)
               newUser.bookClubs.push(results.data)
               console.log('here is the user with the new bookclub',newUser)
               setUser(newUser)
               
               console.log('the newBookClub -->', results.data)
                  
               navigate('/bookclubs') // I'm not sure where to navigate once the bookclub is created. Maybe the bookclub page
            }

            // localStorage.setItem('authToken', results.data.token )
            // authenticateUser()
         })
         .catch((err) => {
               console.log(err)
         })    
   } 
   
   // useEffect(() => {
   //    if (!bookClubs){
   //       getBookClubs()
         
   //    } 
   // }, []);

   return (
      <div className="flex flex-col items-center justify-center w-full mt-10 md:flex-row">

            <div className="max-w-lg mb-5 md:max-w-xl md:mb-0">
               <img
                  className="w-full h-auto"
                  src="/images/open-textbook.jpg"
                  alt="Create Book Club"
               />
            </div>
            <div className="flex flex-col items-center justify-between mt-5 space-y-4 md:ml-10 md:mt-0">
               <h1 className="mb-2 text-xl font-bold text-green-700 text-opacity-75"> Create Your Book Club </h1>
               
                  <form className="flex flex-col justify-between mt-5 md:ml-10 md:mt-0" onSubmit={handleSubmit} >

                     <label className="text-green-700 text-opacity-75" >Book Club Name</label>
                     <input type='text' name="name" value={newBookClub.name} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                     
                     <label className="text-green-700 text-opacity-75">Description</label>
                     <input type='text' name="description" value={newBookClub.description} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>

                     <label className="text-green-700 text-opacity-75">Book Club Image</label>
                     <input type='file' name="clubImg" value={newBookClub.clubImg} onChange={handleChange} accept=".jpg, .jpeg, .png, .pdf" className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                     
                     <label className="text-green-700 text-opacity-75">Meeting Link</label>
                     <input type='text' name="meetingLink" value={newBookClub.meetingLink} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>

                     <label className="text-green-700 text-opacity-75">Schedule</label>
                     <input type='text' name="schedule" value={newBookClub.schedule} onChange={handleChange} className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                     

                     <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit" >Create Book Club Now</button>
                  </form>
            </div>
      </div>
      
   )
}

export default CreateBookClub