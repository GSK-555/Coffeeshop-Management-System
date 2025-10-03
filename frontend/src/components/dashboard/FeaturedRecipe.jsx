import { Coffee, List, FileText, Lightbulb } from "lucide-react";
import SqlQueryButton from "./SqlQueryButton";

const FeaturedRecipe = ({ data, buttonClick }) => {
  const sqlQuery = `SELECT 
    r.name,
    r.instructions,
    r.image_url,
    GROUP_CONCAT(
        CONCAT(ri.quantity, ' ', ri.unit, ' ', i.name)
        ORDER BY ri.display_order
        SEPARATOR '|'
    ) as ingredients
FROM 
    recipes r
JOIN 
    recipe_ingredients ri ON r.id = ri.recipe_id
JOIN 
    ingredients i ON ri.ingredient_id = i.id
WHERE 
    r.is_featured = 1
    AND r.active = 1
GROUP BY 
    r.id
LIMIT 1;`;

  return (
    <div className="fade-in">
      <h2 className="section-title text-3xl font-semibold text-orange-400 mb-6 flex items-center gap-3">
        <Coffee size={30} className="text-orange-300" />
        Featured Coffee Recipe
      </h2>

      <div className="card bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-2xl rounded-xl overflow-hidden transition-transform transform hover:scale-100.5 hover:shadow-xl border-t-4 border-orange-500">
        <div className="h-[250px] bg-cover bg-center relative" style={{ backgroundImage: `url(${data.image})` }}>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white flex justify-between items-end">
            <h3 className="text-3xl font-bold mb-1 text-orange-300">{data.name}</h3>
            <SqlQueryButton handleButtonClick={buttonClick} query={sqlQuery} title="Featured Recipe Query" />
          </div>
          <div className="absolute top-0 right-0 p-4 bg-orange-600 rounded-bl-xl text-white font-semibold">
            Featured
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-orange-400 mb-3 flex items-center gap-2">
              <List size={22} className="text-orange-300" />
              Ingredients
            </h4>
            <ul className="pl-5 text-gray-300 list-disc space-y-2">
              {data.ingredients.map((ingredient, index) => (
                <li key={index} className="text-lg">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold text-orange-400 mb-3 flex items-center gap-2">
              <FileText size={22} className="text-orange-300" />
              Instructions
            </h4>
            <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-orange-500 pl-4">
              {data.instructions}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-orange-400 mb-3 flex items-center gap-2">
              <Lightbulb size={22} className="text-orange-300" />
              Tips
            </h4>
            <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-orange-500 pl-4">
              For a richer flavor, try using freshly ground coffee beans and adjust the sweetness to your taste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipe;