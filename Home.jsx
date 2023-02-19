import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [posts,setPosts]=useState([]);

  const cat=useLocation().search


   //jo url ki information vo is location hook se mil ja ,aur isme bhi agr hume jaise particular cat cahiye to vo search mai h

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const res=await axios.get(`/posts${cat}`);  //ab post vali jo api thi us sey data feetch kr rai ,
        setPosts(res.data)
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[cat])   //yaha aise [cat] likne ka matlb whenever cat changes call this const fetchdata function
  // const posts=[
  //   {
  //     id:1,
  //     title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
  //     img:"https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg"
  
  //   },
  //   {
  //     id:2,
  //     title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
  //     img:"https://www.shutterstock.com/image-illustration/fast-speed-lines-curve-racing-260nw-1627284496.jpg"
  
  //   },
  //   {
  //     id:3,
  //     title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
  //     img:"https://img.freepik.com/premium-photo/lens-flare-effect-black-background_303714-2576.jpg"
  
  //   },
  // ];
  
  const getText=(html)=>{   //jo <p>text</p> ara tha ise hatane kai liye ye sab kara jaki ,security ki vazah se
    const doc=new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
    <div className='posts'>
      {posts.map(post=>(
        <div className='post' key={post.id}>
          <div className='img'>
          <img src={`../upload/${post.img}`} alt=""/>
        </div>
        <div className='content'>
        <Link className="link" to={`/post/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
        <p>{getText(post.desc)}</p>
          <button>Read More</button>
        </div>
        </div>
      ))}
    </div>

    </div>
  )
}

export default Home