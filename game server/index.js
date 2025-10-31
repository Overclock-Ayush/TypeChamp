const express = require("express");
const mongoDB = require("./db");
const cors = require("cors");

const port = process.env.PORT || 5000;

mongoDB().catch(err => {
  console.error("Failed to connect to DB:", err && (err.message || err));
  // don't exit here; let routes respond with errors if DB unavailable
});

const app = express();

// basic health route
app.get("/", (req, res) => {
  res.send("HELLO server");
});

// parse JSON bodies
app.use(express.json());

// CORS: allow list from CLIENT_ORIGIN (comma-separated) or localhost for dev
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    const raw = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
    const whitelist = raw.split(',').map(s => s.trim());

    console.log('CORS check - request origin:', origin, 'whitelist:', whitelist);

    if (whitelist.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// If behind Render (or other) proxy and using secure cookies
app.set('trust proxy', 1);

// API routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));

// 404 -> JSON
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// global error handler -> JSON
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && (err.stack || err.message || err));
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(port, () => {
  console.log("app is listening on port " + port);
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
