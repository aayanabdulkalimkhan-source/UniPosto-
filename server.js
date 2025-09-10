// UniPosto Backend – Zero-Coding Mobile Build
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== ENV VARS =====
const MONGO = process.env.MONGODB_URI;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUD_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUD_SECRET = process.env.CLOUDINARY_API_SECRET;
const JWT_SECRET = process.env.JWT_SECRET || 'uniposto';

// ===== MONGODB CONNECT =====
mongoose.connect(MONGO).then(()=>console.log('Mongo connected')).catch(e=>console.error(e));

// ===== SCHEMAS =====
const UserSchema = new mongoose.Schema({
  googleId:String,
  name:String,
  email:String,
  avatar:String,
  platforms:[{name:String,accessToken:String,refreshToken:String,expiresAt:Number}]
},{timestamps:true});
const User = mongoose.model('User',UserSchema);

const PostSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  platforms:[{name:String,postId:String,status:String}],
  caption:String,
  mediaUrl:String,
  privacy:String,
  schedule:Date,
  createdAt:{type:Date,default:Date.now}
});
const Post = mongoose.model('Post',PostSchema);

// ===== CLOUDINARY CONFIG =====
cloudinary.config({cloud_name:CLOUD_NAME,api_key:CLOUD_KEY,api_secret:CLOUD_SECRET});

// ===== MULTER MEMORY STORAGE =====
const storage = multer.memoryStorage();
const upload = multer({storage,limits:{fileSize:20*1024*1024}}); // 20 MB max

// ===== ROUTES =====
app.get('/health',(req,res)=>res.json({status:'ok',time:new Date()}));

// OAuth placeholder – will be expanded after env vars
app.post('/auth/google',async(req,res)=>{
  const{token}=req.body;
  // Google token verify + save user – detailed after deploy
  res.json({user:{id:'demo',name:'Demo User'},token:'demo-jwt'});
});

// Upload endpoint – real platform APIs will be added next
app.post('/upload',upload.single('file'),async(req,res)=>{
  if(!req.file) return res.status(400).json({error:'No file'});
  const{platforms,caption,privacy,schedule}=req.body;
  const result = await cloudinary.uploader.upload(req.file.path,{resource_type:'auto'});
  const post = new Post({
    userId:'demo',
    platforms:JSON.parse(platforms),
    caption,
    mediaUrl:result.secure_url,
    privacy,
    schedule:schedule?new Date(schedule):null
  });
  await post.save();
  res.json({message:'Upload queued',postId:post._id});
});

// Notifications – dummy for now
app.get('/notifications',(req,res)=>{
  res.json([
    {platform:'YouTube',text:'Post scheduled',read:false},
    {platform:'Instagram',text:'Token expired',read:false}
  ]);
});

// Issue report – auto GitHub issue (free token)
app.post('/report',async(req,res)=>{
  const{type,desc,screenshot}=req.body;
  // GitHub API call – detailed next
  res.json({ticket:'#123',message:'Issue reported'});
});

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Backend live on port',PORT));
    
