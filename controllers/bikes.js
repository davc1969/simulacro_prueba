const { StatusCodes: httpCodes } = require("http-status-codes");
const poolQuery = require("../services/pg_pool_services").pgPoolQuery;
const poolTransaction = require("../services/pg_pool_services").pgPoolTransaction;

const path = require("path");
// const { authKey } = require("../config/auth");


const getStores = async (req, res) => {
    console.log("Controller Get STores");
    const querySQL = {
        text: "select * from stores;",
        values: []
    }
    try {
        const results = await poolQuery(querySQL);
        const storesList = JSON.parse(results);
        return {
            serverCode: httpCodes.OK,
            error: 0,
            errorMessage: "",
            output: storesList
        }
    } catch (error) {
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            output:[]
        }
    }
};

const getCategories = async (req, res) => {
    console.log("Controller Get Caetegories");
    const querySQL = {
        text: "select * from categories;",
        values: []
    }
    try {
        const results = await poolQuery(querySQL);
        const categoriesList = JSON.parse(results);
        return {
            serverCode: httpCodes.OK,
            error: 0,
            errorMessage: "",
            output: categoriesList
        }
    } catch (error) {
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            output:[]
        }
    }
};

const getBrands = async (req, res) => {
    console.log("Controller Get Brands");
    const querySQL = {
        text: "select * from brands;",
        values: []
    }
    try {
        const results = await poolQuery(querySQL);
        const brandsList = JSON.parse(results);
        return {
            serverCode: httpCodes.OK,
            error: 0,
            errorMessage: "",
            output: brandsList
        }
    } catch (error) {
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            output:[]
        }
    }
};


const getSearch = async (req, res) => {
    console.log('Controller Get Search Results');
    let qryTxt =  'select stores.store_name, products.product_id, products.product_name, sum(stocks.quantity) as quantity ';
    qryTxt += 'from stocks ';
    qryTxt += 'inner join products on stocks.product_id = products.product_id ';
    qryTxt += 'inner join categories on products.category_id = categories.category_id ';
    qryTxt += 'inner join  stores on stocks.store_id = stores.store_id ';
    qryTxt += 'inner JOIN brands on products.brand_id = brands.brand_id ';
    qryTxt += 'GROUP BY products.product_id, stores.store_id, categories.category_id, brands.brand_id ';
    qryTxt += 'HAVING stores.store_id = $1 and categories.category_id = $2 and brands.brand_id = $3 ';
    qryTxt += 'ORDER BY sum(stocks.quantity) DESC ';
    const querySQL = {
        text: qryTxt,
        values: Object.values(req.params)
    }
    try {
        const results = await poolQuery(querySQL);
        const resultsList = JSON.parse(results);
        return {
            serverCode: httpCodes.OK,
            error: 0,
            errorMessage: '',
            output: resultsList
        }
    } catch (error) {
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            output:[]
        }
    }
};



module.exports = {
    getStores,
    getCategories,
    getBrands,
    getSearch
}