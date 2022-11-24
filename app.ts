import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route'

const app = express();

app.use(express.json());

// middleware (req, res, next)
app.get("/", (req, res) => {
  res.send("<p style='color:red'>Hello World</p>")
})

app.use('/api', userRouter);


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