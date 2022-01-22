const routes = require("express").Router();
const bikes = require("../controllers/bikes");



routes.get("/monitor", (req, res) => {
    res.sendFile(__dirname + "../public/monitor.html")
});










module.exports = {
    routes
}