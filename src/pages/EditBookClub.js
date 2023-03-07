import React from 'react'

function EditBookClubPage() {
  return (
    <div>EditBookClubPage</div>
  )
}

export default EditBookClubPage

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