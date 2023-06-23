import React, { useState, useEffect } from "react";
import "../../css/Account.css";
import { getAuth, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { app, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
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
  const [userName, setUserName] = useState<any>();
  const [allData, setAllData] = useState<any>();
  const StoredHospitalList = collection(db, "userSavedData");
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
        console.log(user.displayName);

        const updatingDocs = doc(db, "userSavedData", filtered[0]?.id);
        updateDoc(updatingDocs, { UserDisplayName: user.displayName })
          .then((response) => {
            toast.success("Added to Library", {
              position: "top-right",
              autoClose: 800,
              hideProgressBar: false,
              closeOnClick: true,
              theme: "colored",
            });
            console.log("success");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
        const errorCode = error.code;
        if (errorCode === "auth/network-request-failed") {
          setError("No internet connection");
        }
      });
  };

  const handleImageChange = (e: any) => {
    setUpdateImage(e.target.files[0]);

    if (!e.target.files[0]) {
      setError("Please select a file");
    }
  };
  const UploadImage = () => {
    if (updateImage === null) return;
    const user: any = auth.currentUser;
    const imageRefs = ref(storage, `image`);

    //  uploading image to firebase Storage
    uploadBytes(imageRefs, updateImage)
      .then(() => {
        console.log("uploadSuccessful");
        getDownloadURL(imageRefs)
          .then((url) => {
            updateProfile(user, { photoURL: url })
              .then(() => {
                console.log("Photo updated");
                setRerender(!rerender);
              })
              .catch((error) => {
                console.log(error);
              });

            //  Updating image Field in firebase SnapShot
            const updatingDocs = doc(db, "userSavedData", filtered[0]?.id);
            updateDoc(updatingDocs, { image: url })
              .then((response) => {
                toast.success("Updated firebase", {
                  position: "top-right",
                  autoClose: 800,
                  hideProgressBar: false,
                  closeOnClick: true,
                  theme: "colored",
                });
                console.log("success");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserSavedList = () => {
    onSnapshot(StoredHospitalList, (snapshot) => {
      const Data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setAllData(Data);
    });
  };

  const filtered = allData?.filter(
    (items: any) => items.data.userId === user?.uid
  );
  useEffect(() => {
    getUserSavedList();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // )
  }, [rerender]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="colored"
      />
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
                placeholder={filtered ? filtered[0].data.UserDisplayName : "Loading"}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
