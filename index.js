const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");


const PORT = process.env.PORT || 3000;
const { routes } = require("./routes/routes");
const { routesBikes } = require("./routes/routesAPIBikes")

 
//views and partials engine
// app.engine("hbs", exphbs({
//     extname: "hbs",
//     defaultLayout: 'index',
//     layoutsDir: __dirname + "/views/layouts",
//     partialsDir: __dirname + "/views/partials"
// }));
// app.set("view engine", "hbs");


// middlewares
app.use(express.static("./public/"));
// app.use("/pics", express.static("./files/profilesPics"))

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extend: true }));
app.use(morgan('common', {
    stream: fs.createWriteStream('./log/access.log', {flags: 'a'})
}));
app.use(morgan('dev'));
//app.use(fileUpload( { debug: true } ));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//routes
app.use(routes);
app.use(routesBikes);



app.listen(PORT, () => {
    console.log(`Server is up and listening by port ${PORT}, process: ${process.pid}`);
})