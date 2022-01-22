/* Consulta D */
/* reporte con la cantidad de inventario de productos por marca, ordenado descendentemente */


select brands.brand_id, brands.brand_name, sum(stocks.quantity)
from stocks
inner join products on stocks.product_id = products.product_id
inner join brands on products.brand_id = brands.brand_id
GROUP BY brands.brand_id
ORDER BY sum(stocks.quantity) DESC


