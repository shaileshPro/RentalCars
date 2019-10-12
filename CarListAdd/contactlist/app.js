var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');

var config = require('./Configuration/config');

 
// connect to mongoDB 
mongoose.connect(config.dbUrl);

var app = express();


var route = require('./routes/route');


mongoose.connect(config.dbUrl,{ useNewUrlParser: true });


mongoose.connection.on('connected',()=>{
    console.log('connected------');

})


mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('not connected------')
    }
    
    
    
    
})


app.use(function(req,res,next){
    const data ="coming on : " + new Date().getTime()
   
    res .setHeader('Access-Control-Allow-Origin', '*');
    //console.log();
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
   
    // Pass to next layer of middleware
    next();
})

var port = 8000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//app.use(express.static(path.join( __dirname,'public')));

app.use('/api',route)

app.get('/',(req,res)=>{
    res.render('index.html');
});

app.listen(port,()=>{
    console.log('ffffff'+port)
});