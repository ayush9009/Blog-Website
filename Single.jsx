import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import moment from "moment";   //jo 2 days ago ara vo isi ki madath se ave
import { AuthContext } from '../context/authContext';
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});


  const location = useLocation();

  //ab jo vo location hai us sey mai path split kar ra hun 
  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext);

  const navigate=useNavigate();


  //jo url ki information vo is location hook se mil ja ,aur isme bhi agr hume jaise particular cat cahiye to vo search mai h

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);  //ab post vali jo api thi us sey data feetch kr rai ,
        setPost(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId])
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);  //ab post vali jo api thi us sey data feetch kr rai ,
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }


  const getText=(html)=>{   //jo <p>text</p> ara tha ise hatane kai liye ye sab kara jaki ,security ki vazah se
    const doc=new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className='content'>
      
        <img src={`../upload${post?.img}`} alt="" />
        <div className='user'>
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (<div className='edit'>
            {/* ye Edit aur Delete vali images ayegi yaaha pr */}
            {/* <img src={Edit}
          <img src={Delete} */}
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
          )}
        </div>
        {/* <h1>{post.title}</h1>
        {getText(post.desc)}
      </div> */}
      <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>      </div>
 
      <Menu cat={post.cat}/>      
      {/* ye cat={post.cat} as a props pass kar diya humne menu component ko post.cat yani jo vo hai uski category
      bej di aur di ya menu component ko ki bhai is sey related sari posts show kar do */}
      {/* ab menu kya functinal component kah lo ya component to isme argrument bej rai ,argument kah lo ya phir props kah lo  */}
    </div>
  )
}

export default Single

// import React, { useEffect, useState } from "react";
// import Edit from "../img/edit1.jpeg";
// import Delete from "../img/delete.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Menu from "../components/Menu";
// import axios from "axios";
// import moment from "moment";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
// import DOMPurify from "dompurify";

// const Single = () => {
//   const [post, setPost] = useState({});

//   const location = useLocation();
//   const navigate = useNavigate();

//   const postId = location.pathname.split("/")[2];

//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`/posts/${postId}`);
//         setPost(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, [postId]);

//   const handleDelete = async ()=>{
//     try {
//       await axios.delete(`/posts/${postId}`);
//       navigate("/")
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const getText = (html) =>{
//     const doc = new DOMParser().parseFromString(html, "text/html")
//     return doc.body.textContent
//   }

//   return (
//     <div className="single">
//       <div className="content">
//         <img src={`../upload/${post?.img}`} alt="" />
//         <div className="user">
//           {post.userImg && <img
//             src={post.userImg}
//             alt=""
//           />}
//           <div className="info">
//             <span>{post.username}</span>
//             <p>Posted {moment(post.date).fromNow()}</p>
//           </div>
//           {currentUser.username === post.username && (
//             <div className="edit">
//               <Link to={`/write?edit=2`} state={post}>
//                 <img src={Edit} alt="" />
//               </Link>
//               <img onClick={handleDelete} src={Delete} alt="" />
//             </div>
//           )}
//         </div>
//         <h1>{post.title}</h1>
//         <p
//           dangerouslySetInnerHTML={{
//             __html: DOMPurify.sanitize(post.desc),
//           }}
//         ></p>      </div>
//       <Menu cat={post.cat}/>
//     </div>
//   );
// };

// export default Single;






















































































































