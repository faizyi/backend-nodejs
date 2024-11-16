import express from "express";
import path from "path"
import cors  from "cors"
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)

const app = express();
const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// use for public file
// app.use(express.static(path.join(dirName, "public")));
// render html
app.set("view engine", "ejs");
// use for ejs file
app.set("views", path.join(dirName, "src", "views"));

app.use(cors())

app.get("/", (req, res)=>{
    res.render("home")
});
// app.get("/profile/:name", (req, res)=>{
//     res.send(req.params.name)
//     res.render("home")
// });
// app.get("/profile/:name/:age", (req, res)=>{
//     res.send(`${req.params.name} & ${req.params.age}`)
//     res.render("home")
// });

app.listen(PORT, ()=>{
    console.log(`Server is runing on ${PORT}`)
})
