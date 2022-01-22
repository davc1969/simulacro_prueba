let stores = [];
let categories = [];
let brands = [];


const getStores = async () => {
  const res = await fetch("http://localhost:3000/api/stores");
  const data = await res.json();
  stores = data;
  console.log("data", data);
};


const getCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories");
  const data = await res.json();
  categories = data;
  console.log("data", data);
};

const getBrands = async () => {
  const res = await fetch("http://localhost:3000/api/brands");
  const data = await res.json();
  brands = data;
  console.log("data", data);
};


const searchBikes = async () => {
  const storeId = document.querySelector("#sel_stores").value;
  const categoryId = document.querySelector("#sel_categories").value;
  const brandId = document.querySelector("#sel_brands").value;
  console.log(storeId, categoryId, brandId);

  const res = await fetch(`http://localhost:3000/api/search/${storeId}/${categoryId}/${brandId}`);
  const data = await res.json();
  brands = data;
  console.log("data", data);

  if (data) {
    let rowToAdd = ""
    let resultsList = document.querySelector("#searchResults");
    for (let i = 0; i < data.length; i++) {
      rowToAdd = `<tr>`
      rowToAdd += `  <td>${data[i].store_name}</td>`
      rowToAdd += `  <td>${data[i].product_id}</td>`
      rowToAdd += `  <td>${data[i].product_name}</td>`
      rowToAdd += `  <td>${data[i].quantity}</td>`
      rowToAdd += `  <td><a href="" class="button-primary">Ver</a></td>`
      rowToAdd += `</tr>`;
      resultsList.innerHTML += rowToAdd;
    }


  }
}


(async () => {
  await getStores();

  let storesList = document.querySelector("#sel_stores");
  stores.forEach( (s, i) => {
    storesList.innerHTML += `<option value="${stores[i].store_id}">${stores[i].store_name}</option>`

  })

  await getCategories();

  let categoriesList = document.querySelector("#sel_categories");
  categories.forEach( (s, i) => {
    categoriesList.innerHTML += `<option value="${categories[i].category_id}">${categories[i].category_name}</option>`

  })

  await getBrands();

  let brandsList = document.querySelector("#sel_brands");
  brands.forEach( (s, i) => {
    let selOption = document.createElement("option")
    brandsList.innerHTML += `<option value="${brands[i].brand_id}">${brands[i].brand_name}</option>`

  })

})()
