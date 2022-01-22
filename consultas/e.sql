/* Consulta E */
/* inventario para la tienda Santa Cruz Bike de los productos que tienen en existencia en la categoría Electric Bikes */


select products.product_id, products.product_name, sum(stocks.quantity) as quantity
from stocks
inner join products on stocks.product_id = products.product_id
inner join categories on products.category_id = categories.category_id
inner join  stores on stocks.store_id = stores.store_id
GROUP BY products.product_id, stores.store_name
HAVING stores.store_name = 'Santa Cruz Bikes'
ORDER BY sum(stocks.quantity) DESC


