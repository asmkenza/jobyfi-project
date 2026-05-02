const express=require('express');
const cors = require('cors');
const connectDB = require('./conf/db');
const userPath=require('./routes/user.routes');
const jobPath = require('./routes/job.routes');
const dotenv=require('dotenv');
dotenv.config(); 


// connect to the database
connectDB();

// Init app
const app=express();


// Ajoute le middleware CORS
// app.use(cors({
//     origin: 'http://localhost:3000', // Remplace par l'URL de ton frontend
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     credentials: true,
//   }));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// apply middleware
app.use(express.json());

app.use('/api/user',userPath);
app.use('/api/job', jobPath);


// Running the server 
const PORT=process.env.PORT; 
app.listen(PORT, () => {
    console.log(`Server is running in mode on port ${PORT}`);
});
