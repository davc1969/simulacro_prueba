require("dotenv").config();
const fs = require("fs");
const poolQuery = require("./services/pg_pool_services").pgPoolQuery;


const getUsers = async () => {
    console.log("reading users");
    const querySQL = {
        text: "select first_name || ' ' || last_name as userName from customers;",
        values: []
    }
    try {
        const results = await poolQuery(querySQL);
        const users = results;
        return {
            serverCode: 200,
            error: 0,
            errorMessage: "",
            usersList: results
        }
    } catch (error) {
        return {
            serverCode: 501,
            error: error.code,
            errorMessage: error.message,
            usersList:[]
        }
    }
};

const createUsersJSON = async () => {
    await getUsers()
    .then( (result) => {
        fs.writeFileSync("./db/users.json", JSON.stringify(result.usersList));
    })
    .catch ( (error) => {
        console.log("error reading database ", error);
    })
}


// first, read database and create users JSON
let myArgs = []
createUsersJSON()
.then ( () => {
    myArgs = process.argv.slice(2);
})
.then ( () => {
    return JSON.parse(fs.readFileSync("./db/users.json", "utf8"));
})
.then  ( (jsonUsers) => {
    const allUsers = JSON.parse(jsonUsers)
    const userFound = allUsers.find( u => u.username == myArgs[0] )
    if (userFound) {
        console.log(`Cliente: ${userFound.username}`);
        console.log(`          Su compra es de ${myArgs[1]} pesos`);
        console.log(`          porcentaje de descuento ${myArgs[2]} da un total de ${parseInt(myArgs[1]) * ((100 - parseFloat(myArgs[2])) / 100)}`);

    } else {
        console.log(`Don: ${myArgs[0]}`);
        console.log(`  Actualmente usted no es cliejte de la tienda, favor registrarse para poder realizar sus compras`);
    }

})



