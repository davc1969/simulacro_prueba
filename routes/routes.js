const routes = require("express").Router();
const bikes = require("../controllers/bikes");
// const jwt = require("jsonwebtoken");
// const { authKey } = require("../config/auth");


routes.get("/", (req, res) => {
    let skatersInfo = [];
    skaters.getAll(req, res)
    .then( async (skList) => {
        skatersInfo = await createSkArray(req, res, skList.listaSkaters)
    })
    .then( () => {
        res.render("../views/index", 
        {
            layout: "index",
            title: "Santiago Skate Park",
            skts: skatersInfo,
            showInicio: false,
            showLogin: true,
            showRegister: true
        });
    })
});






const createSkArray = async (req, res, skList) => {
    let skatersArray = [];
    let resultOne;
    try {
        for (i = 0; i < skList.length; i++) {
            req.params.id = skList[i].id;
            resultOne = await skaters.getOne(req, res);
            resultOne.listaSkaters[0].index = i + 1;
            skatersArray.push(resultOne.listaSkaters[0]);
        };
        return skatersArray;
    } catch (error) {
        console.log("Error en arreglo de skaters ", error.message);
    }
}



module.exports = {
    routes
}