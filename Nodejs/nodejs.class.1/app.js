const http = require('http');
const queryString = require("node:querystring")
const fs = require("fs")
const path = require("path");
const bcrypt = require("bcryptjs");

const port = 3001;
const filePath = path.join(process.cwd(), "data.json")
const id = 0;


const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("home")
        res.end();
        return
    }
    if (req.url === "/signup") {
        res.setHeader('Content-Type', 'text/html');
        res.write(`<form action="/ssubmit" method="POST"><input type="email" name="email" 
        placeholder="Enter Email"><input type="password" name="password"
        placeholder="Enter Password">
        <button>signup</button></form>`)
        res.end();
        return
    }
    if (req.url === "/ssubmit") {
        let data = ""
        req.on("data", (chunk) => {
            console.log(chunk);
            data += chunk
        })
        req.on("end", () => {
            const parsedData = queryString.parse(data)
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log("Error reading file", err);
                    res.write("Error reading file");
                    res.end();
                } else {
                    let jsonData = JSON.parse(data);
                    const hashedPassword = bcrypt.hashSync(parsedData.password, 8);
                    jsonData.users.push({
                        id : id + 1,
                        email: parsedData.email,
                        password: hashedPassword,
                    })
                    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err)=>{
                        if(err) {
                            console.log("Error writing file", err);
                            res.write("Error writing file");
                            res.end();
                        } else {
                            console.log("Data updated successfully");
                            res.writeHead(302, {"location" : "/login"});
                            res.end();
                        }
                    })
                }
            })
        })
        return
    }
    if(req.url === "/login"){
        res.setHeader("content-type", "text/html");
        res.writeHead(200);
        res.end(`<form action="/submit" method="POST"><input type="email" name="email" 
        placeholder="Enter Email"><input type="password" name="password"
        placeholder="Enter Password">
        <button>login</button></form>`)
        return
    }
    if(req.url === "/submit"){
        let data = "";
        req.on("data", (chunk)=>{
            data += chunk
        })
        req.on("end",()=>{
            const parsedData = queryString.parse(data)
            fs.readFile(filePath, (err,data)=>{
                if(err){
                    console.log("Error reading file", err);
                    res.write("Error reading file");
                    res.end(); 
                }else{
                    const jsonData = JSON.parse(data);
                    const comparedPassword = bcrypt.compareSync(parsedData.password, 
                    jsonData.users[0].password);
                    const matchData = jsonData.users.find(user=> user.email === parsedData.email 
                    && comparedPassword)
                    // const submittedEmail = parsedData.email;
                    // const submittedPassword = parsedData.password;
                    // const matchData = jsonData.users.find(user=> user.email === submittedEmail
                    // && user.password === submittedPassword)
                    if(matchData){
                        console.log("Login successful");
                        res.write("Login Success");
                    }else{
                        console.log("Login unsuccessful");
                        res.write("Login Unsuccess");
                    }
                    res.end();
                }
            })
        })
        return
    }
    res.write("Invalid Route");
    res.end();
});


server.listen(port, () => {
    console.log(`server is running ${port}`);
})