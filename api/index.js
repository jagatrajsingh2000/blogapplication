import  express  from "express";
import dotenv from "dotenv"
import connection from "./database/db.js";
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'
import  categoryRoute from "./routes/categories.js";
//cors and body parse--------------------------------------
import bodyParser from "body-parser";
import cors from 'cors'
//importing multer for image storage-----------------------
import multer from "multer";
//importing path for setting path for imanges------------which are going to be displayed----------
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//--------------------------------------------------

const app = express();
app.use(express.json())

//setting up path for images
app.use("/images",express.static(path.join(__dirname,"/images")))

dotenv.config();
connection()
app.use(cors());
//multer start-------------------------------------------------------------------
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req, file, cb)=>{
        cb(null,req.body.name);
    },
});

const upload = multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been upload");
});
//multer end -----------------------------------------------------------------------

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/auth",authRoute)

app.use("/api/users",usersRoute)

app.use("/api/posts",postRoute)

app.use("/api/categories",categoryRoute)
app.use("/api/comments",commentRoute)



app.listen("8000",()=>{
    console.log("listening to port")
})