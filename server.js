const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const multer = require('multer');
const path = require('path');


// Dotenv configuration
dotenv.config();

// DB connection Establish
connectDB();

// Create Express app
const app = express();
app.use(express.urlencoded({ extended: false }));


// -------------------------------------------

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads/"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split(".").pop();
        req.body.image = file.fieldname + "-" + uniqueSuffix + "." + extension;

        cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
});

const upload = multer({ storage: storage });
// ---------------------------------------------


app.use(upload.any());

// Middlewares
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/v1/test", require('./routes/testRoute'));
app.use('/auth', require('./routes/authRoute'));

// app.use('/auth', upload.single('image'), require('./routes/authRoute'));
app.use("/api/v1/user", require('./routes/userRoute'));
app.use("/resturant", require('./routes/resturantRoute'));
app.use('/category', require('./routes/categoryRoute'));
app.use('/foods', require('./routes/foodRoute'));

// Default route
app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to Food Server hello</h1>");
});

// Listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Node Server running on ${PORT}`.yellow.underline.bold);
});
