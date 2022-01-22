/* Consulta B */
/* un inventario de productos para mujeres (aquellos que dice Ladies en el nombre) ordenado por precio descendente */


select product_id, product_name, model_year, list_price
from products
where product_name like '%Ladies%'
order by list_price DESC;

