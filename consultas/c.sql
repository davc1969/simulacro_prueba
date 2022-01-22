/* Consulta C */
/* reporte con la cantidad de productos de cada categoría, ordenado de mayor a menor cantidad */


select categories.category_id, categories.category_name, sum(stocks.quantity)
from stocks
inner join products on stocks.product_id = products.product_id
inner join categories on products.category_id = categories.category_id
GROUP BY categories.category_id
ORDER BY sum(stocks.quantity) DESC


