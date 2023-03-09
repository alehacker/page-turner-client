import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { post } from "../services/authService"
import { AuthContext } from "../context/authContext"


const SignUp = () => {
 
   const { authenticateUser } = useContext(AuthContext);
   const [profileImage, setProfileImage] = useState(null);
   const [isUploading, setIsUploading] = useState(false);
   const navigate = useNavigate();
   
   const [newUser, setNewUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
   });
   
   const handleChange = (e) => {
      setNewUser((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };
   
   const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      setProfileImage(file);
   };
   
   const handleSubmit = async (e) => {
      e.preventDefault();
   
      if (!profileImage) {
         console.log("Please select an image to upload.");
         return;
      }
   
      setIsUploading(true);
   
      try {
         const formData = new FormData();
         formData.append("profileImage", profileImage);
         formData.append("firstName", newUser.firstName);
         formData.append("lastName", newUser.lastName);
         formData.append("email", newUser.email);
         formData.append("password", newUser.password);
   
         const response = await post("/auth/signup", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
         });
   
         console.log("Created User", response.data);
         navigate(`/profile/${response.data._id}`);
         localStorage.setItem("authToken", response.data.token);
         authenticateUser();
      } catch (error) {
         console.log(error);
      } finally {
         setIsUploading(false);
      }
   };

   // const { authenticateUser } = useContext(AuthContext)
   
   // const [profileImage, setProfileImage] = useState('');

   // const [isUploading, setIsUploading] = useState(false); // new state variable

   
   // const navigate = useNavigate()
   
  
   
   // const [ newUser, setNewUser ] = useState(
   //    {
   //     firstName: "",
   //     lastName: "",
   //     email: "",
   //     password: "",
   //     profileImage: "",
   //    }
   // )
   
   // const handleChange = (e) => {
   //    setNewUser((recent)=>({...recent, [e.target.name]: e.target.value}))
   //    console.log("Changing user", newUser)
   // }

   // const handleSubmit = (e) => {
   //    e.preventDefault()
   //    post('/auth/signup', newUser)
   //       .then((results) => {
   //          console.log("Created User", results.data)
   //          navigate(`/profile/${results.data._id}`)
   //          localStorage.setItem('authToken', results.data.token )
   //          authenticateUser()
   //       })
   //       .catch((err) => {
   //             console.log(err)
   //       })    
   // } 
   
   

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
                     <input type='file' name="profileImage"  
                     
                        
                      accept=".jpg, .jpeg, .png, .pdf" className="px-4 py-2 border border-green-700 border-opacity-50"></input>
                    
                     <button className="px-4 py-2 my-4 mr-2 font-bold text-white bg-green-700 bg-opacity-75 rounded hover:bg-green-500" type="submit"  >Sign Up</button> 
                  </form>
            </div>
      </div>
      
   )
   
}

export default SignUp

//profile icon link on cloudinary
// https://res.cloudinary.com/dlfkksswh/image/upload/v1678391981/profile-icon_nnli4g.jpg


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

//  { isUploading ? (<p>Uploading photo...</p> ) 
//  : ( */}
///  onChange={(e) => handleFileUpload(e)} 

// const handleFileUpload = (e) => {
//    setIsUploading(true); // set isUploading to true
//    console.log("Uploading photo...")
//    const uploadData = new FormData()
//    uploadData.append('profileImage', e.target.files[0])
//    console.log("FILE LIST", e.target.files.length)
//    if (e.target.files.length){
//       post('/auth/new-profile-photo', uploadData)
//         .then((result) => {
//           setProfileImage(result.data.profileImage)
//           console.log("This is photo", result.data)
//         })
//         .catch((err) => {
//           console.log("Upload error", err)
//         })
//         .finally(() => {
//           setIsUploading(false); // set isUploading to false after the upload is complete
//         });
//     }
// }




