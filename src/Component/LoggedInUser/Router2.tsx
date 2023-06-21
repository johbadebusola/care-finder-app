import React from 'react'
import { Route,Routes } from 'react-router'
import { Search } from '../Search'
import { Account } from './Account'
import { Library } from './Library'

export const Router2 = () => {
  return (
    <div>
       <Routes>
            <Route path='/*' element={<Account />}  />
            <Route path='/search'  element={<Search />} /> 
            <Route path='/library'  element={<Library />} /> 
        </Routes>
    </div>
  )
}




// import React, { useState, useEffect } from "react";
// import "../../css/Account.css";
// import { getAuth, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
// import { app,storage } from "../../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// export const Account = () => {
//   const [updateEmail, setUpdateEmail] = useState<any>();
//   const [updateFullname, setUpdateFullname] = useState<string|null>();
//   const [updateImage, setUpdateImage] = useState<any>();
//   const [error, setError] = useState<string>();
//   const [success, setSuccess] = useState<string>();
//   const [user, setUser] = useState<any>([]);
//   const [url,setUrl] = useState<any>()
//   const auth = getAuth(app);

//   const updateMail = () => {
//     const users: any = auth.currentUser;

//     verifyBeforeUpdateEmail(users, updateEmail)
//       .then(() => {
//         console.log(" verification sent for email update");
//         setSuccess("Verification sent to the new email");
//       })
//       .catch((error: any) => {
//         console.log(error);
//         const errorCode = error.code;
//         if (errorCode === "auth/network-request-failed") {
//           setError("No internet connection");
//         }

//         if (errorCode === "auth/invalid-new-email") {
//           setError("Invalid Email");
//         }
//       });
//   };

//   const UploadImage = () => {
      
//     const imageRef = ref(storage,"image")
//     uploadBytes(imageRef,updateImage)
//     .then(() =>{
//      console.log("uploadSuccessful")
//      setSuccess("image uploaded")
//      getDownloadURL(imageRef)
//      .then((url) =>{
//          setUrl(url)
//      })
//      .catch((error) =>{
//          console.log(error)
//      })
//     })
//     .catch((error) =>{
//      console.log(error)
//  })

//  const updateName = () => {

//   const user:any = auth.currentUser
//   updateProfile(user, { displayName: updateFullname })
//       .then(() => {
//           console.log("displayName updated")
//       })
//       .catch((error:any) => {
//           console.log(error)
//           const errorCode= error.code
//           if (errorCode === "auth/network-request-failed") {
//             setError("No internet connection");
//           }
//       })

// }

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//   }, []);

//   return (
//     <>
//       <div className="profile-cont">
//         <div className="Account-info">
//           <h1> My details</h1>
//           <h4> Personal Information</h4>
//           <hr />
//           <div className="grid">
//             <p> Update your personal information</p>

//             <div className="form">
//               <h3 className="error2">{error} </h3>
//               <h3 className="success"> {success} </h3>
//               <label>Email Address</label>
//               <br />
//               <input
//                 type="email"
//                 placeholder={user.email}
//                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                   setUpdateEmail(event.target.value);
//                   if (event.target.value.length === 0) {
//                     setError("");
//                   }
//                 }}
//               />
//               <button onClick={updateMail}> SAVE </button>
//               <br />
//               <label>Full Name</label>
//               <br />
//               <input
//                 type="text"
//                 placeholder={user.displayName}
//                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                   setUpdateFullname(event.target.value);
//                   if (event.target.value.length === 0) {
//                     setError("");
//                   }
//                 }}
//               />
//               <button onClick={updateName}> SAVE </button>

//               <br />
//               <label>Upload Picture</label>
//               <br />
//               <input type="file" />
//               <button onClick={UploadImage}> SAVE </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// }

