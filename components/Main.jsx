import React, { useEffect } from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromAi } from "../ai"

export default function Main() {

    const [ingredients, setIngredients] = React.useState(
        // ["all the main spices", "pasta", "ground beef", "tomato paste"]
        []
    )
    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    
    const recipeSection = React.useRef(null)

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    async function getRecipe() {
        setLoading(true)
        setRecipe("")

        let isFirstChunk = true;

        await getRecipeFromAi(ingredients, (chunk) => {
            if (isFirstChunk) {
                setLoading(false); 
                isFirstChunk = false; 
            }
            setRecipe((prevRecipe) => prevRecipe + chunk); 
        });
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. rice"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && <IngredientsList ref={recipeSection} ingredientsList={ingredients} getRecipe={getRecipe}/>}

            <ClaudeRecipe recipe={recipe} loading={loading} ref={recipeSection}/>

        </main>
    )
}