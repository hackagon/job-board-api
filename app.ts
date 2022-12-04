import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import { applyPassport } from './middlewares/passport.middleware';

// routers
import userRouter from './routes/user.route'
import verificationRouter from './routes/verification.route';
import meRouter from './routes/me.route';
import companyRouter from './routes/company.route';

const app = express();


app.use(express.json());

applyPassport(passport);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
passport.serializeUser(function (user, done) {
  done(null, user);
});


// middleware (req, res, next)
app.get("/", (req, res) => {
  res.send("<p style='color:red'>Hello World</p>")
})

app.use('/api', userRouter);
app.use('/api', verificationRouter)
app.use('/api', meRouter)
app.use('/api/companies', companyRouter)


const port = process.env.PORT || 4000
app.listen({ port }, () => {
  mongoose.connect("mongodb://localhost:27017/job_board", {
    autoIndex: true,

  })
    .then(() => {
      console.log('App is running:')
      console.table({
        port,
        dbType: "mongodb",
        dbHost: "localhost"
      })
    })
    .catch(console.log)
})