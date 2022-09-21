import express  from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routes/userSignupRoutes.js';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import config from 'dotenv/config'
import Signup from './models/userSignupModel.js';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import cookieParser from 'cookie-parser';
const MongoDBStore = connectMongoDBSession(session);
import flash from 'connect-flash';





const app = express();
const store = new MongoDBStore({
    uri: 'mongodb+srv://gyeltshen:gyeltshen11@credintial.n2k0ms9.mongodb.net/gcitvote',
    collection:'sessions'

});
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json());

app.use(session({
    secret: 'secret for users',
    resave: false,
    saveUninitialized: false,
    store: store
}

));
app.use(flash());
// initlized the cokiess
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(Signup.createStrategy());
// passport.serializeUser(Signup.serializeUser());
// passport.deserializeUser(Signup.deserializeUser());

//connection to mongodb
mongoose.connect(process.env.DB_CONNECTION_URL, () => {
    console.log('connected to db')
})
//used to hash and salt the password


// for session 


// middleware for signup 
app.use(userRouter);
app.listen(3000, function () {
    console.log(`server is running in localhost:${3000}`)
})