const queries = [
    {
        key: "1",
        sql: "SELECT i.ing_name, r.quantity, i.ing_meas FROM recipes r JOIN ingredients i ON r.ing_id = i.ing_id WHERE r.recipe_id = 'HDR-CAP-MD';"
    },
    {
        key: "2",
        sql: "SELECT ing_name, ing_price, ing_meas FROM ingredients ORDER BY ing_price DESC LIMIT 1;"
    },
    {
        key: "3",
        sql: "SELECT ing_id, COUNT(DISTINCT recipe_id) as recipe_count FROM recipes GROUP BY ing_id HAVING recipe_count > 1;"
    },
    {
        key: "4",
        sql: "SELECT ing_id, SUM(quantity) as total_used FROM recipes GROUP BY ing_id;"
    },
    {
        key: "5",
        sql: "SELECT it.item_name, SUM(o.quantity) as total_sold FROM orders o JOIN items it ON o.item_id = it.item_id GROUP BY it.item_name ORDER BY total_sold DESC LIMIT 1;"
    },
    {
        key: "6",
        sql: "SELECT it.item_cat, SUM(o.quantity) as total_items_sold FROM orders o JOIN items it ON o.item_id = it.item_id GROUP BY it.item_cat;"
    },
    {
        key: "7",
        sql: "SELECT it.item_name, SUM(o.quantity * CAST(REPLACE(REPLACE(it.item_price, '£', ''), ' ', '') AS DECIMAL(5,2))) AS revenue FROM orders o JOIN items it ON o.item_id = it.item_id GROUP BY it.item_name;"
    },
    {
        key: "8",
        sql: "SELECT DATE(created_at) as sale_date, COUNT(*) as orders_count FROM orders GROUP BY sale_date ORDER BY orders_count DESC LIMIT 1;"
    },
    {
        key: "9",
        sql: "SELECT staff_id, first_name, last_name, position FROM staff;"
    },
    {
        key: "10",
        sql: "SELECT AVG(sal_per_hour) as avg_salary FROM staff;"
    },
    {
        key: "11",
        sql: "SELECT COUNT(*) as barista_count FROM staff WHERE position = 'Barista';"
    },
    {
        key: "12",
        sql: "SELECT first_name, last_name, sal_per_hour FROM staff ORDER BY sal_per_hour DESC LIMIT 3;"
    },
    {
        key: "13",
        sql: "SELECT i.ing_name, inv.quantity, i.ing_meas FROM inventory inv JOIN ingredients i ON inv.ing_id = i.ing_id;"
    },
     {
        key: "14",
        sql: "SELECT i.ing_name, inv.quantity FROM inventory inv JOIN ingredients i ON inv.ing_id = i.ing_id WHERE inv.quantity < 5;"
    },
    {
        key: "15",
        sql: "SELECT SUM(inv.quantity * i.ing_price) as total_inventory_value FROM inventory inv JOIN ingredients i ON inv.ing_id = i.ing_id;"
    },
    {
        key: "16",
        sql: "SELECT i.ing_name, inv.quantity FROM inventory inv JOIN ingredients i ON inv.ing_id = i.ing_id ORDER BY inv.quantity DESC LIMIT 1;"
    }
];

module.exports = queries;
