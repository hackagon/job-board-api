import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import { applyPassport } from './middlewares/passport.middleware';
import path from 'path';

// routers
import userRouter from './routes/user.route'
import verificationRouter from './routes/verification.route';
import meRouter from './routes/me.route';
import companyRouter from './routes/company.route';
import jobRouter from './routes/job.route';

const app = express();

/**
 * @todo  serve static files/folders
 */
// app.use('/assets', express.static(path.join(__dirname, "..", "tmp/uploads")));


/**
 * @todo  handle data json in request
 */
app.use(express.json());

/**
 * @todo  handle authentication
 */
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


/**
 * @todo  say hello
 */
app.get("/", (req, res) => {
  res.send("<p style='color:red'>Hello World</p>")
})

app.use('/api', userRouter);
app.use('/api', verificationRouter)
app.use('/api', meRouter)
app.use('/api/companies', companyRouter)
app.use('/api/jobs', jobRouter)


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