/* Consulta E */
/* inventario para la tienda Santa Cruz Bike de los productos que tienen en existencia en la categoría Electric Bikes */


select stores.store_name, products.product_id, products.product_name, sum(stocks.quantity) as quantity
from stocks
inner join products on stocks.product_id = products.product_id
inner join categories on products.category_id = categories.category_id
inner join  stores on stocks.store_id = stores.store_id
inner JOIN brands on products.brand_id = brands.brand_id
GROUP BY products.product_id, stores.store_id
HAVING stores.store_id = 1
  and categories.category_id = 3
  AND brands.brand_id = 2
ORDER BY sum(stocks.quantity) DESC


