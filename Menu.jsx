import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Menu = ({cat}) => {
  const [posts,setPosts]=useState([]);
   //jo url ki information vo is location hook se mil ja ,aur isme bhi agr hume jaise particular cat cahiye to vo search mai h

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const res=await axios.get(`/posts/?cat=${cat}`);  //ab post vali jo api thi us sey data feetch kr rai ,
        //axios ka kaha sun bhai ye api hai /post/?cat=${cat} is api se data fetech kar res mai store kar de ,aur phir setPosts mai vo data jo 
        // receivie vo dal de
        setPosts(res.data)
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[cat])
    // const posts=[
    //     {
    //       id:1,
    //       title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
    //       desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
    //       img:"https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg"
      
    //     },
    //     {
    //       id:2,
    //       title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
    //       desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
    //       img:"https://www.shutterstock.com/image-illustration/fast-speed-lines-curve-racing-260nw-1627284496.jpg"
      
    //     },
    //     {
    //       id:3,
    //       title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
    //       desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu tristique nisl. Nulla et velit sapien. Morbi scelerisque eu nisl ut posuere. Maecenas et elementum sem, ac cursus diam",
    //       img:"https://img.freepik.com/premium-photo/lens-flare-effect-black-background_303714-2576.jpg"
      
    //     },
    //   ];
  return (
    <div className='menu'>
        <h1>Other posts you make like</h1>    
        {/* deko menu component bnaya taki jo post ,mtlb jasie art ki post hai ek,to menu mai art related post show honi chaiey
        uske liye ye logic likha post img,post tititle */}  
        {/* upr usestate use kar raki jo api se particular category ka data fetch karegi menu mai show kar degi */}
        {posts.map(post=>(
            <div className='post' key={post.id}>
            <img src={`../upload/${post?.img}`} alt="" />
                <h2>{post.title}</h2>
                <button>Read More </button>
            </div>
        ))}
        
    </div>
  )
}

export default Menu