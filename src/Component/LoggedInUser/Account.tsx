import React, { useState, useEffect } from "react";
import "../../css/Account.css";
import { getAuth, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { app, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes, listAll } from "firebase/storage";
// import ghost from "../../images/Ghost Recon.jpg"

export const Account = () => {
  const [updateEmail, setUpdateEmail] = useState<any>();
  const [updateFullname, setUpdateFullname] = useState<string | null>();
  const [updateImage, setUpdateImage] = useState<any>(null);
  const [rerender, setRerender] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [user, setUser] = useState<any>([]);
  const auth = getAuth(app);
  const [url, setUrl] = useState<any>();
  const [allImage,setAllImage] = useState<[] | null>([])
  const imageList = ref(storage, "Avatar-image/");
  const updateMail = () => {
    const users: any = auth.currentUser;

    verifyBeforeUpdateEmail(users, updateEmail)
      .then(() => {
        console.log(" verification sent for email update");
        setSuccess("Verification sent to the new email");
      })
      .catch((error: any) => {
        console.log(error);
        const errorCode = error.code;
        if (errorCode === "auth/network-request-failed") {
          setError("No internet connection");
        }

        if (errorCode === "auth/invalid-new-email") {
          setError("Invalid Email");
        }
      });
  };

  const updateName = () => {
    const user: any = auth.currentUser;
    updateProfile(user, { displayName: updateFullname })
      .then(() => {
        if (updateFullname?.length === undefined) {
          setError("input Name");
          return;
        }
        setRerender(!rerender);
        console.log("displayName updated");
      })
      .catch((error: any) => {
        console.log(error);
        const errorCode = error.code;
        if (errorCode === "auth/network-request-failed") {
          setError("No internet connection");
        }
      });
  };

  // photoURL: "https://example.com/jane-q-user/profile.jpg

  const handleImageChange = (e: any) => {
    setUpdateImage(e.target.files[0]);

    // if (e.target.files[0]) {

    //   console.log(e.target.files[0]);
    // }
    if (!e.target.files[0]) {
      setError("Please select a file");
    }
  };

  const UploadImage = () => {
    if (updateImage === null) return;
    const user: any = auth.currentUser;
    // const imageRef = ref(storage, `Avatar-image/${updateImage.name}`);
    const imageRefs = ref(storage, `image`);
    uploadBytes(imageRefs, updateImage)
      .then(() => {
        console.log("uploadSuccessful");
        getDownloadURL(imageRefs)
        .then((url) =>{
          updateProfile(user, { photoURL: url })
          .then(() => {
            console.log("Photo updated");
            setRerender(!rerender)
          })
          .catch((error) => {
            console.log(error);
          });
            setUrl(url)
        })
        .catch((error) =>{
            console.log(error)
        })
         
         
       
      })
      .catch((error) => {
        console.log(error);
      });

   
  };

  console.log(url);

 

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user)
      } else {
        setUser(null);
      }
    });

    // listAll(imageList).then((response) => {
    
 
    //   response.items.forEach(item => {
    //     getDownloadURL(item)
    //     .then((url) => {
    //       setAllImage( prev => [...prev, url])
    //     })
    //   })  

      
    // }
    



    // )
  }, [rerender])

  // console.log(updateFullname?.length)

  return (
    <>
      <div className="profile-cont">
        <div className="Account-info">
          <h1> My details</h1>
          <h4> Personal Information</h4>
          <hr />
          <div className="grid">
            <p> Update your personal information</p>

            <div className="form">
              <h3 className="error2">{error} </h3>
              <h3 className="success"> {success} </h3>
              <label>Email Address</label>
              <br />
              <input
                type="email"
                placeholder={user.email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUpdateEmail(event.target.value);
                  if (event.target.value.length === 0) {
                    setError("");
                  }
                }}
              />
              <button onClick={updateMail}> SAVE </button>
              <br />
              <label>Full Name</label>
              <br />
              <input
                type="text"
                placeholder={user.displayName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUpdateFullname(event.target.value);
                  if (event.target.value.length === 0) {
                    setError("");
                  }
                }}
              />
              <button onClick={updateName}> SAVE </button>

              <br />
              <label>Upload Picture</label>
              <br />
              <input type="file" onChange={handleImageChange} />
              <button onClick={UploadImage}> SAVE </button>

              <img className="avatar" src={user.photoURL} alt="avatar" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
