const routesBikes = require("express").Router();
const bikes = require("../controllers/bikes");
const { routes } = require("./routes");



// API v2. api returns values and they are showed by the router not the controller
routesBikes.get("/api/stores", (req, res) => {
    console.log("API get all stores");
    runControl(req, res, bikes.getStores)
}); 

routesBikes.get("/api/categories", (req, res) => {
    console.log("API get all stores");
    runControl(req, res, bikes.getCategories)
}); 

routesBikes.get("/api/brands", (req, res) => {
    console.log("API get all stores");
    runControl(req, res, bikes.getBrands)
}); 

routesBikes.get("/api/search/:idStore/:idCategory/:idBrand", (req, res) => {
    console.log("API get search results");
    runControl(req, res, bikes.getSearch)
}); 





const runControl = (req, res, skaterFunction) => {
    skaterFunction(req, res)
    .then( (result) => {
        //console.log("runcontrol result", result);
        res.status(result.serverCode);
        res.json(result.output)
    })
    .catch ( (error) => {
        //console.log("error en runcontrol ", error);
        res.status(error.serverCode);
        res.json(error)
    })
}

const runControl2 = (req, res, skaterFunction) => {
    
    return new Promise ( (resolve, reject) => {
        skaterFunction(req, res)
        .then( (result) => {
            console.log("runcontrol result", result);
            res.status(result.serverCode);
            res.json(result.listaBikes)
        })
        .catch ( (error) => {
            console.log("error en runcontrol ", error);
            res.status(error.serverCode);
            res.json(error)
        })
    })
    
}


const getToken = (req, res) => {
    try {
        const result = Bikes.verifyLogin(req, res);
        const token = result.token;
        console.log("RRRR", result);
        console.log("ttt", token);
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    routesBikes
}