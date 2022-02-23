//Node core language + express framwork
// npm init
// npm install
//<><>
//[client(xml)->Server(xml)]
//[POST -> ,GET ->,PUT->,DELETE ->]


// mobile wifi -> system1(192.168.84.145)
//             -> system2(192.168.84.146)


//AWS -> [EC2("13.23.223.129")]


//require done here
var express = require("express");
var utility = require('./utility/utils');
var session = require('express-session')
var path = require("path");
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

function checkLogin(req,res,next){
    if(req.session.username){
        next()
    }else{
        res.send({
            status:"Error",
            data:"unauthorize access denied"
        })
    }
    
}

//app.use("/",getName)


// get request to render file
app.get("/",function(req,res){

    // if user is logged in 
    // we should display dashbord
    // not a loggedin user
    console.log(req.session)
    if(req.session && req.session.username){
        res.sendFile(path.join(__dirname+'/public/dashbord.html'))
    }
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get("/securedRoute",checkLogin,function(req,res){
    res.send({
        status:"Success",
        cookieInfo:req.cookies.authcode,
        data:"This is my secured data"
    })
    
})

//var data = [jhhggh];


app.post("/login",function(req,res){


    
    const user = req.body.username;
    const pass = req.body.password;

    if(user==="admin" && pass === "admin"){
        console.log(req.session)
        res.cookie("authcode","asdasdasdsadasdasd")
        req.session.username = user;
        res.send({
            status:"Success",
            data:"User is authenticated, Login success "
        })
        return;
    }


    res.send({
        status:"Error",
        data:"not a valid user"
    })

})



app.get("/getUserData/:userId",function(req,res){
  

    // db -> connection
    // select * from user
    //{

    //}
    //getUserData/1212121
    console.log(req.params.userId)
    var userData = {
        name:"abc",
        age:"12",
        address:"abc asb"
    }

    res.send(userData);

})

app.listen(5000,function(){
    console.log("Started listening to PORT"+5000)
})









console.log(utility())