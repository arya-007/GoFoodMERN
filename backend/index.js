// const express = require('express')
// const app = express()
// const port = 5000
// const monogDB=require("./db")

// monogDB();



// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000"),
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })

// app.use(express.json());

// app.use('/api',require("./Routes/CreateUser"));
// app.use('/api',require("./Routes/DisplayData"));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoDB = require("./db");

mongoDB().catch((err) => {
  console.error("Failed to initialize MongoDB:", err);
  process.exit(1);
});


app.use(cors({
  origin: 'https://gofood-frontend-96h4.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  credentials: true
}));

app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
