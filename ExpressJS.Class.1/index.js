import express from 'express'
const app = express()

// const users = [
//     {
//         id : 1,
//         name : 'faiz',
//         email : 'faiz@gmail.com',
//     },
//     {
//         id : 2,
//         name : 'ahmed',
//         email : 'ahmed@gmail.com',
//     },
//     {
//         id : 3,
//         name : 'awais',
//         email : 'awais@gmail.com',
//     }
// ]
app.use(express.json())
const port = 5000
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.listen(port, ()=>{
    console.log('Server is running');
})


// app.post('/user', (req,res)=>{
//     console.log('data is coming', req.body);
//     users.push(req.body)
// })
// app.delete('/user/:id',(req,res)=>{
//     const index = users.findIndex(data =>data.id == req.params.id)
//     users.splice(index, 1)
// })
// app.put('/user/:id',(req,res)=>{
//     const index = users.findIndex(data => data.id === req.params.id)
//     users.splice(index , 1 , req.body)
// })