import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../ai"

export default function Main() {

    const [ingredients, setIngredients] = React.useState(
        // ["all the main spices", "pasta", "ground beef", "tomato paste"]
        []
    )

    const [recipe, setRecipe] = React.useState("")

    // Loader 
    const [loading, setLoading] = React.useState(false)

    async function getRecipe() {
        setLoading(prev => !prev)
        const generatedRecipe = await getRecipeFromMistral(ingredients) 
        setRecipe(generatedRecipe)
        setLoading(prev => !prev)
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

            {ingredients.length > 0 && <IngredientsList ingredientsList={ingredients} getRecipe={getRecipe}/>}

            {<ClaudeRecipe recipe={recipe} loading={loading} />}

        </main>
    )
}
