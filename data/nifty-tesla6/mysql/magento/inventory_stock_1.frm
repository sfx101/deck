TYPE=VIEW
query=select distinct `legacy_stock_status`.`product_id` AS `product_id`,`legacy_stock_status`.`website_id` AS `website_id`,`legacy_stock_status`.`stock_id` AS `stock_id`,`legacy_stock_status`.`qty` AS `quantity`,`legacy_stock_status`.`stock_status` AS `is_salable`,`product`.`sku` AS `sku` from (`magento`.`cataloginventory_stock_status` `legacy_stock_status` join `magento`.`catalog_product_entity` `product` on((`legacy_stock_status`.`product_id` = `product`.`entity_id`)))
md5=37fda0a555cbf9b1a25eccb3faac15fe
updatable=0
algorithm=0
definer_user=magento
definer_host=%
suid=0
with_check_option=0
timestamp=2021-01-20 05:43:26
create-version=1
source=SELECT\n                    DISTINCT    \n                      legacy_stock_status.product_id,\n                      legacy_stock_status.website_id,\n                      legacy_stock_status.stock_id,\n                      legacy_stock_status.qty quantity,\n                      legacy_stock_status.stock_status is_salable,\n                      product.sku\n                    FROM cataloginventory_stock_status legacy_stock_status\n                      INNER JOIN catalog_product_entity product\n                        ON legacy_stock_status.product_id = product.entity_id
client_cs_name=utf8
connection_cl_name=utf8_general_ci
view_body_utf8=select distinct `legacy_stock_status`.`product_id` AS `product_id`,`legacy_stock_status`.`website_id` AS `website_id`,`legacy_stock_status`.`stock_id` AS `stock_id`,`legacy_stock_status`.`qty` AS `quantity`,`legacy_stock_status`.`stock_status` AS `is_salable`,`product`.`sku` AS `sku` from (`magento`.`cataloginventory_stock_status` `legacy_stock_status` join `magento`.`catalog_product_entity` `product` on((`legacy_stock_status`.`product_id` = `product`.`entity_id`)))
