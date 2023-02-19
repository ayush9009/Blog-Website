// import jwt from "jsonwebtoken";
// import { db } from "../db.js";

// export const getPosts = (req, res) => {
//     // agr mtln ye sari query hum lik rai ,jaise ki 
//     // req.query.cat agr koi cat ki query
//     // agr let us suppose art category hai to vo vali post oopen kar do lakin agr aisa nhi hai to sari posts show kar do
//     //?cat=art  ? mark kai bad jo likha vo query hai ,
//     // req.query.cat? yani agr cat vali query hai (ab jo bhi cat vali query uske agey cat=art kabi cat=science aise hoga to hum kah
//     // rai select * from posts where cat=? vo vali cat database se uhta lo jo user query kar ra else )
//     // else agr vo category related data nhi milta to sari posts show kar do i.e select * from posts
//     const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
//     db.query(q, [req.query.cat], (err, data) => {
//         if (err) return res.status(500).send(err);
//         //yaha shyd .json(err) bi aa skae

//         return res.status(200).json(data);
//     })
// }
// export const getPost = (req, res) => {
//     // p.img kuki user mai bhi image hai aur posts mai bhi image hai
//     const q = "SELECT p.id, `username`,`title`,`desc`, p.img, u.img AS userImg,`cat`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?"  //dono uses table aur posts table join kar di using JOIN ,join possible hai kuki user id aur post id same hi hai
//     db.query(q, [req.params.id], (err, data) => {
//         if (err) return res.status(500).json(err);

//         return res.status(200).json(data[0]);
//     })  //what is params id in url are params

// }


// export const addPost = (req, res) => {
//     const token=req.cookies.access_token;
//     // const token = req.cookie.access_token
//     if (!token) return res.status(401).json("Not authenticated");

//     jwt.verify(token, "jwtkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!!");

//         const q = "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`)VALUES (?)"

//         const values = [
//             req.body.title,
//             req.body.desc,
//             req.body.img,
//             req.body.cat,
//             req.body.date,
//             userInfo.id
//         ]
//         db.query(q, [values], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.json("Post has been created");
//         })
//     });
// };


// export const deletePost = (req, res) => {
//     //deko sabse pahle deko ki kahi cookie to expire ni hogi ,agr hogyi hai to delete ni kar sakte
//     //dusri bat ek to token ki bat hogi ,ek kya ye post mereko belong karte hai ,agr karte hai to hi mai delete kar sakta hun nhi to nhi kar sakta
//     const token = req.cookies.access_token
//     if (!token) return res.status(401).json("Not authenticated");

//     jwt.verify(token, "jwtkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!!");

//         const postId = req.params.id;
//         const q = "DELETE FROM posts WHERE `id`= ? AND `uid` = ?"

//         db.query(q, [postId, userInfo.id], (err, data) => {
//             if (err) return res.status(403).json("You can delete only your post!!");

//             return res.json("Post has been deleted!!");
//         })
//     })
// }


// export const updatePost = (req, res) => {
//     // const token = req.cookie.access_token
//     const token = req.cookies.access_token
//     if (!token) return res.status(401).json("Not authenticated");

//     jwt.verify(token, "jwtkey", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!!");
        
//         const postId=req.params.id
//         const q = "UPDATE posts SET `title`=? , `desc`=? ,`img`=? ,`cat`=? WHERE `id`=? AND `uid`=?";

//         const values = [
//             req.body.title,
//             req.body.desc,
//             req.body.img,
//             req.body.cat,
            
//         ]
//         // . . . ye tin dotes ...values se pahle ka mtlb values mai jo bhi hai vo sab upadte kar do bhai kuch 
//         db.query(q, [...values,postId,userInfo.id], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.json("Post has been updated");
//         })
//     });
// }

import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};


































































































