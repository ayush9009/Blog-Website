import React from 'react'
import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';


// whenever there is change in the editor reactquill change the value
const Write = () => {

  const state=useLocation().state

  const [value, setValue] = useState(state?.title || '');  //if state existe to sethojaga title if not it means it means it is a new post
  const [title,setTitle] = useState(state?.desc || '');
  const [file,setFile] = useState('null');
  const [cat,setCat] = useState(state?.cat || '');

  const navigate=useNavigate();

  //to upload the image we have use file storage cloduinary but here we use different thing
  //for uploading we crearte upload router and use multer package to uplaod images

  const upload=async()=>{
    try{
      const formData=new FormData();
      formData.append("file",file);
      const res=await axios.post("/upload",formData);
      return res.data;
    }catch(err){
      console.log(err);
    }
  }
  
  const handleClick=async e=>{
    e.preventDefault()
    const imgUrl=await upload();
    console.log(imgUrl);

    try{
      // console.log(`${state.id}`);
      state?await axios.put(`/posts/${state.id}`,{title,desc:value,cat,img:file?imgUrl:""  //agr state hai to update vala page khulna chaiye
    }):await axios.post(`/posts/`,{title,desc:value,cat,img:file?imgUrl:"",date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), //nhi to normal page
  });
   navigate("/");
    }catch(err){
      console.log(err);
    }
  }
  
  console.log(value);
  return (
    <div className='add'>
      <div className='content'>
        <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className='editorContainer'>
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input style={{ display: "none" }} type="file" id="file" name="" onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor='file'>Upload Image</label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <input type="radio" checked={cat==="art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat==="science"} name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat==="technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat==="cinema"} name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat==="projects"} name="cat" value="projects" id="projects" onChange={e=>setCat(e.target.value)} />
            <label htmlFor='projects'>Projects</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat==="food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)} />
            <label htmlFor='food'>Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write





// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import moment from "moment";

// const Write = () => {
//   const state = useLocation().state;
//   const [value, setValue] = useState(state?.title || "");
//   const [title, setTitle] = useState(state?.desc || "");
//   const [file, setFile] = useState(null);
//   const [cat, setCat] = useState(state?.cat || "");

//   const navigate = useNavigate()

//   const upload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const res = await axios.post("/upload", formData);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     const imgUrl = await upload();

//     try {
//       state
//         ? await axios.put(`/posts/${state.id}`, {
//             title,
//             desc: value,
//             cat,
//             img: file ? imgUrl : "",
//           })
//         : await axios.post(`/posts/`, {
//             title,
//             desc: value,
//             cat,
//             img: file ? imgUrl : "",
//             date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//           });
//           navigate("/")
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="add">
//       <div className="content">
//         <input
//           type="text"
//           placeholder="Title"
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <div className="editorContainer">
//           <ReactQuill
//             className="editor"
//             theme="snow"
//             value={value}
//             onChange={setValue}
//           />
//         </div>
//       </div>
//       <div className="menu">
//         <div className="item">
//           <h1>Publish</h1>
//           <span>
//             <b>Status: </b> Draft
//           </span>
//           <span>
//             <b>Visibility: </b> Public
//           </span>
//           <input
//             style={{ display: "none" }}
//             type="file"
//             id="file"
//             name=""
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <label className="file" htmlFor="file">
//             Upload Image
//           </label>
//           <div className="buttons">
//             <button>Save as a draft</button>
//             <button onClick={handleClick}>Publish</button>
//           </div>
//         </div>
//         <div className="item">
//           <h1>Category</h1>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "art"}
//               name="cat"
//               value="art"
//               id="art"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="art">Art</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "science"}
//               name="cat"
//               value="science"
//               id="science"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="science">Science</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "technology"}
//               name="cat"
//               value="technology"
//               id="technology"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="technology">Technology</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "cinema"}
//               name="cat"
//               value="cinema"
//               id="cinema"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="cinema">Cinema</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "design"}
//               name="cat"
//               value="design"
//               id="design"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="design">Design</label>
//           </div>
//           <div className="cat">
//             <input
//               type="radio"
//               checked={cat === "food"}
//               name="cat"
//               value="food"
//               id="food"
//               onChange={(e) => setCat(e.target.value)}
//             />
//             <label htmlFor="food">Food</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Write;



























































































