import express from "express";
import path from "path"
import multer from "multer";
import cors  from "cors"
import { fileURLToPath } from "url";
const __fileName = fileURLToPath(import.meta.url)
const __dirName  = path.dirname(__fileName)

const app = express();
const PORT = 5001;

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "./uploads")
    },
    filename: (req, file, cb)=>{
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
        console.log(uniqueName)
        return cb(null, `${uniqueName}-${file.originalname}`)
    }
})

app.use(express.json());
// handleForm Data
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirName, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirName, "src", "views"));
const upload = multer({storage: storage});
app.use(cors());

app.get("/", (req, res)=>{
    res.render("home")
})

app.post("/upload", upload.single("profileImage"), (req, res)=>{
    console.log(req.file)
    res.render("home")
})

app.listen(PORT, ()=>{
    console.log(`Server on ${PORT}`)
})