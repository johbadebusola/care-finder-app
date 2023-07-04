import React, { useState, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import { app, db } from "../../firebase";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import "../../css/Feeds.css";
import { getAuth } from "firebase/auth";
import Loader from "../loader";
import commentIcon from "../../images/comment.png";
import { ToastContainer, toast } from "react-toastify";
import addIcon from "../../images/add100.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
const Post = () => {
  const [allData, setAllData] = useState<any>();
  const [user, setUser] = useState<any>();
  const auth = getAuth(app);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [commentData, setCommentData] = useState<any>();
  const [clear, SetClear] = useState<boolean>(false);
  const navigate = useNavigate();
  const getFeedData = () => {
    setLoading(true);
    const StoredHospitalList = collection(db, "FeedData");
    onSnapshot(StoredHospitalList, (snapshot) => {
      const Data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setAllData(Data);
      setLoading(false);
    });
  };



  const toggleComment = (index: number) => {
    setToggle(!toggle);
    for (let i = 0; i < allData.length; i++) {
      if (i === index) {
        const updatingDocs = doc(db, "FeedData", allData[i].id);
        updateDoc(updatingDocs, {
          toggle: toggle,
        })
          .then((response) => {
            console.log("success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    getFeedData();
  }, []);

  const submit = (index: any) => {
    for (let i = 0; i < allData.length; i++) {
      if (i === index) {
        const updatingDocs = doc(db, "FeedData", allData[i].id);
        updateDoc(updatingDocs, {
          commentText: arrayUnion({
            text: commentData,
            userImage: user.photoURL,
            name: user.displayName,
          }),
          toggle: toggle,
        })
          .then((response) => {
            console.log("success");
            setToggle(!toggle);
            SetClear(!clear);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setCommentData(" ");

    toast.success("Comment added", {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    });
  };


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
      <header className="App-header">View Post from users</header>
      {loading ? (
        <div className="loading">
          <Loader />
        </div>
      ) : (
        <div>
          {allData?.map((item: any, index: number) => (
            <div key={index} className="feed-cont2">
              <div className="grid1">
                <img src={item.data.image} alt="img" />
                <p> {item.data.UserDisplayName}</p>
              </div>
              <div
                id="preview"
                className="bg-info"
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(JSON.parse(item.data.FeedData)),
                }}
              />

              {item ? (
                <div className="comment">
                  <div>
                    <motion.img
                      onClick={() => {
                        toggleComment(index);
                      }}
                      style={{ width: "20px" }}
                      src={commentIcon}
                      alt="addLogo"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    />

                    <p> {item.data.commentText?.length} </p>
                  </div>

                  {/* <p> View comment</p> */}
                </div>
              ) : (
                <p> No data</p>
              )}

              <div>
                {item ? (
                  <div>
                    {item.data.commentText?.map((comment: any, index:number) => (
                      <div key={index} className="view-comment">
                        <div>
                          <img src={comment.userImage} alt="img" />
                          <p> {comment.name}</p>
                        </div>
                        <p> {comment.text} </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p> djdj</p>
                )}
              </div>
              <div
                className={`comment-box ${
                  item.data.toggle ? "toggle-comment" : " "
                }`}
              >
                <form
                  onSubmit={(e: React.MouseEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    submit(index);
                  }}
                  className="form-comment"
                >
                  <div>
                    <img src={user.photoURL} alt="img" />
                    <textarea
                      className="TextArea"
                      placeholder="Enter Comment"
                      value={commentData}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setCommentData(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <button> Comment</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
      {allData?.length === 0 ? <h4 className="no-post2"> No Post Yet </h4> : " "}
      <div className="add-icon">
        <motion.img
          onClick={() => {
            navigate("/feeds");
          }}
          style={{ width: "50px" }}
          src={addIcon}
          alt="addLogo"
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
    </>
  );
};

export default Post;
