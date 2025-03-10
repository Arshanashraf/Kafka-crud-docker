import express from "express"
import mongoose from "mongoose"
import User from "./models/user.model.js"
import produceMessage from "./producer.js"
const app = express()
app.use(express.json())

app.post('/api/user', async (req, res) => {
    const user =  await User.create(req.body);
    await produceMessage('user-events', {action: "CREATE", user});
    res.status(200).json(user)
})

app.get('/api/users', async (req, res) => {
    const users =  await User.find()
    res.status(200).json(users)
})
app.put('/api/user:id', async(req, res)=> {
    const user =  await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    await produceMessage('user-events', {action: "UPDATE", user})
    res.status(200).json()
})
app.delete('/api/user:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    await produceMessage('user-events', {action: "DELETE", user})
    res.json({message: "user has been deleted"})
})
mongoose.connect("mongodb+srv://arshanashraf2002:henGpUQlVJsT8U83@cluster0.cgreh.mongodb.net/Kafka-crud?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("connected to database");
    app.listen(5000,()=>{
        console.log("server is running at port 5000");
        
    })
    
})
.catch(()=> {
    console.log("connection failed!!");
    
})