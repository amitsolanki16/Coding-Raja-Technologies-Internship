const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path"); 
const env = require("dotenv");
const mongoose = require("mongoose"); 
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Load environment variables
env.config(); 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// CORS configuration
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your frontend URL
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // Allow DELETE method
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
