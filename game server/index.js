const express = require("express");
const mongoDB = require("./db");
const cors=require('cors');
const port=5000;
mongoDB();
const app=express();
// app.use((req,res,next)=>{
//     res.setHeader("Acess-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept" 
//     );
//     next();
// })
app.get("/",(req,res)=>{
    res.send("HELLO server");
});

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (Array.isArray(process.env.CLIENT_ORIGIN)) {
      // not typical — prefer comma-separated string if multiple
    }
    const whitelist = (process.env.CLIENT_ORIGIN || 'http://localhost:3000').split(',').map(s => s.trim());
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// If you plan to use secure cookies behind Render's proxy:
app.set('trust proxy', 1);

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use("/api",require("./Routes/CreateUser"));
app.use("/api",require("./Routes/DisplayData"));
app.listen(port,()=>{
    console.log("app is listening on port "+port);
});




// const express = require("express");
// const mongoDB = require("./db");
// const cors=require('cors');
// const port=5000;
// mongoDB();
// const app=express();
// // app.use((req,res,next)=>{
// //     res.setHeader("Acess-Control-Allow-Origin","http://localhost:3000");
// //     res.header(
// //         "Access-Control-Allow-Headers",
// //         "Origin, X-Requested-With, Content-Type, Accept" 
// //     );
// //     next();
// // })
// app.get("/",(req,res)=>{
//     res.send("HELLO server");
// });

// app.use(cors());
// app.use(express.json());
// app.use("/api",require("./Routes/CreateUser"));
// app.use("/api",require("./Routes/DisplayData"));
// app.listen(port,()=>{
//     console.log("app is listening on port "+port);
// });
