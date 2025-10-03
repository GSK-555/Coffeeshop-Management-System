// no need now -> you can delete this file
export const sqlInventoryQueries = {
        totalItems: `SELECT COUNT(*) as total_items 
    FROM ingredients 
    WHERE quantity > 0;`,
    
        lowStock: `SELECT 
        name, 
        quantity, 
        unit, 
        min_threshold as threshold
    FROM 
        ingredients
    WHERE 
        quantity <= min_threshold
    ORDER BY 
        (quantity / min_threshold) ASC;`,
    
        stockUsage: `SELECT 
        i.name, 
        SUM(iu.quantity_used) as usage
    FROM 
        ingredient_usage iu
    JOIN 
        ingredients i ON iu.ingredient_id = i.id
    WHERE 
        iu.usage_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    GROUP BY 
        i.name
    ORDER BY 
        usage DESC
    LIMIT 5;`,
      }