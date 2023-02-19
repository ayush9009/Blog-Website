// express:it used to build a single web page multipage and hybrid web application.it's a layer built on the top of nodejs and helps in managing the servers and routers
import express from "express";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";
import multer from "multer"; ``

const app = express() //taki express ki functionality ko use kar sake

app.use(express.json()) //otherwise peopele wont able to send any daata to db
app.use(cookieParser());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)   //ab same name se image upload ho sake to name unique karne kai liye Date.now()jod diya sath mai
    },
})

const upload = multer({ storage })
// const upload=multer=({dest:'./uploads'});

// app.post('/api/upload', upload.single('file'), function (req, res) {
//     const file=req.file;
//     res.status(200).json(file.filename);
// })
app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });
  

// api se data get karne kai liye api.get
//ya ek trah ki api bna di apne app.get(/test) jis sey pai abhi filhal it works fine hai as a data
//yani agr apne api/posts i.e agr localhost/posts lik diya postroutes render ho jaga
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
    console.log("Connected!");
})












































































































































































