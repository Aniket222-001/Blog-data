const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("")
.then(()=>{
    console.log('successfully connected to data base')
})
.catch((e)=>{
   console.log('failed to connect to databse')
})

const userSchema = new mongoose.Schema({
    title: String,
    category: String,
    img: String,
    desc: String,
    date: { type: Date, default: Date.now }
})

const usermodel = mongoose.model('user',userSchema,'Blogdata')

app.post('/blogpost',async(req,res)=>{
     const {title,category,img,desc} = req.body;
     const date = Date.now()
     const findtitle = await usermodel.findOne({title})
     if(findtitle){
        return res.json({
            meassage: 'title is already present'
        })
     }
     else{
        const creatblog = await usermodel.create({
            title,
            category,
            img,
            desc,
            date
        })

        return res.status(200).json({
            meassage: 'blog is created successfull'
        })
     }
})

app.get('/blog/data',async(req,res)=>{
    try{
        const blogdata = await usermodel.find();
        return res.json({blogdata});
        
        //  return res.json({
        //     meassage: "what are you looking at"
        // })
    }
    catch(e){
        return res.json({
            meassage: 'faile to fetch data of user'
        })
    }
})
app.get('/',(req,res)=>{
    return res.status(404).json({
        meassage: "sever Domain is runnin nicely so what"
    })
})

app.listen(4001,()=>{
    console.log('server is live')
})
