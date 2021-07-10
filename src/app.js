const express = require("express");
const app = express();
const path = require("path")
const hbs = require("hbs")

// getting connection from models 
require("./db/conn")
const Register = require("./models/registers");
const Book = require("./models/addbooks");

const port = process.env.PORT || 4000;

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")

app.use(express.json()); 
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partial_path)

app.get("/",(req, res)=> {
    res.render("index");
})

app.get("/register",(req,res)=>{
    res.render("register")
})



app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/about",(req,res)=>{
    res.render("about")
})
app.post("/login",async(req,res)=>{
    try{
        const uemail = req.body.email;
        const upassword = req.body.password;

        const useremail = await Register.findOne({email:uemail})
        console.log(useremail.person);
        console.log(upassword);
        // const userpass 
        // res.send(useremail.password);
        if( (upassword === useremail.password) && (useremail.person === "customer") ){
            
             res.status(201).render("search")
        }
        else if((upassword === useremail.password)&(useremail.person === "admin")){
                res.status(201).render("addbooks")
        }
        else{
            res.send("Invalid UserId or Password")
        }


    }catch(e){
        res.status(400).send("invalid")
    }
})

app.post("/search",async (req,res)=>{
    try{
        const uname = req.body.search;
        const username = await Book.findOne({name:uname})
        // const userbookid = await Book.findOne({bookid : uname})

        console.log(username.name);
        // console.log(userbookid.bookid);
        
            res.status(201).render("success")
        
       
       

    }
    catch(err){
        res.status(400).send("invalid")
    }
})


// creating connection with database for new registration
app.post("/register",async (req,res)=>{
    try{
       const password = req.body.password;
       const confirmPass = req.body.confirmpassword;

       console.log(password);
       console.log(confirmPass);

       if(password === confirmPass){
            const registerUser = new Register({
                firstname : req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                person : req.body.person

            })
            const registered = await registerUser.save();
            res.status(201).render("register")
       }else{
           res.send("passwords donot match")
       }

    }catch(e){
        res.status(400).send(e)
    }
})


// creating database and connection for adding books
app.post("/addbooks",async (req,res)=>{
    try{
        const registerBook = new Book({
            bookid : req.body.bookid,
            name : req.body.name,
            publisher : req.body.publisher,
            price : req.body.price,
            pages : req.body.pages,
            quantity : req.body.quantity

        // console.log(req.body.prices);

        })

        const bookregister = await registerBook.save();
        res.status(201).render("addbooks")
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.listen(port , () => {
    console.log(`Server is running at port ${port}`);
})

