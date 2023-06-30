import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../css/Feeds.css";
import draftToHtml from "draftjs-to-html";
import { app, db } from "../../firebase";
import { addDoc, arrayRemove, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Loader from "../loader";
import del from "../../images/trash.png";

const Feeds = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [allData, setAllData] = useState<any>();
  const [allUserData, setAllUserData] = useState<any>();
  const [user, setUser] = useState<any>();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const getUserSavedList = () => {
    const feeds = collection(db, "FeedData");
    onSnapshot(feeds, (snapshot) => {
      const Data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setAllData(Data);
    });

    const Stored = collection(db, "userSavedData");
    onSnapshot(Stored, (snapshot) => {
      const Data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setAllUserData(Data);
    });
  };

  const filtered = allUserData?.filter(
    (items: any) => items.data.userId === user?.uid
  );

  if (filtered) {
    // console.log(allData[0]?.data.userId , user?.uid)
  }

  const filteredPost = allData?.filter(
    (items: any) => items.data.userId === user?.uid
  );

  console.log(filteredPost);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    getUserSavedList();
  }, []);

  const uploadFeeds = () => {
    localStorage.setItem(
      "data",
      JSON.stringify(editorState.getCurrentContent())
    );

    addDoc(collection(db, "FeedData"), {
      userId: user.uid,
      FeedData: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      UserDisplayName: user.displayName,
      image: filtered[0].data.image,
      commentText: [],
    }).then((res) => {
      toast.success("Post Uploaded", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
      });
      navigate("/post");
      setEditorState(EditorState.createEmpty());
    });
  };

  const goBack = () => {
    navigate("/post");
  };

  const deletePost = (item:any) => {

    deleteDoc(doc(db, "FeedData", filteredPost[0]?.id)) 
    .then((response) => {
      toast.error("Deleted", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
      });
    })
    .catch((error) => {
      console.log(error);
    });
     
  }

  return (
    <div>
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
      <header className="App-header">Write Post</header>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: false },
          history: { inDropdown: true },
        }}
      />
      <div className="buttons">
        <motion.button
          className="btn"
          onClick={uploadFeeds}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Upload
        </motion.button>

        <motion.button
          className="btn2"
          onClick={goBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Back
        </motion.button>
      </div>

<div className="App-header"> Your Post </div>
      {filteredPost ? (
        <div>
          {filteredPost?.map((item: any) => (
            <div key={filteredPost.id} className="feed-cont">
              <div className="grid1">
                <div>
                  <img src={item.data.image} alt="img" />
                  <p> {item.data.UserDisplayName}</p>
                </div>
                <motion.img
                onClick={() => { deletePost(item)}}
                  src={del}
                  alt="del"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
                
              </div>
              <div
                id="preview"
                className="bg-info"
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(JSON.parse(item.data.FeedData)),
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Feeds;
