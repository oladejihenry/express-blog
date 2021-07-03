const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');

//Database Connection
mongoose.connect('mongodb://localhost:27017/blog', { useUnifiedTopology: true, useNewUrlParser: true }).then((db)=>{
    console.log('MongoDB Connected');
}).catch(error=>console.log(error));


//Public files
app.use(express.static(path.join(__dirname, 'public')));


//Template Engine
app.set('views','./views')
app.set('view engine', 'ejs')
// app.engine('handlebars',expresshandlebars({defaultLayout: 'home'}));
// app.set('view engine', 'handlebars');

//Upload Middleware
app.use(upload());

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Method Ovverride
app.use(methodOverride('_method'));

//Load Routes Main Frontend
const home = require('./routes/home/main');

//Middleware for main frontend
app.use('/', home)

//Load Roues for Admin
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

//Middleware for admin
app.use('/admin', admin);
app.use('/admin/posts', posts);


//Server
app.listen(4000, ()=> {
    console.log(`Listening on port 4000`)
});

