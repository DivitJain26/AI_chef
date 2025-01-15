import { HfInference } from '@huggingface/inference'


const PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those 
ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they 
didn't mention, but try not to include too many extra ingredients. most importantly the recipe should be Indian. Format your response in 
markdown to make it easier to render to a web page
`

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

// export async function getRecipeFromAi(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     try {
//         const response = await hf.chatCompletion({
//             model: "meta-llama/Meta-Llama-3-8B-Instruct",
//             messages: [
//                 { role: "user", content: PROMPT + ` I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`},
//             ],
//             temperature: 0.5,
//             max_tokens: 1024,
//             top_p: 0.7
//         })
//         // console.log(response)
//         return response.choices[0].message.content
//     } catch (err) {
//         console.error(err.message)
//     } 
// }

export async function getRecipeFromAi(ingredientsArr, onChunk) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const stream = hf.chatCompletionStream({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [
                { role: "user", content: PROMPT + ` I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`},
            ],
            temperature: 0.5,
            max_tokens: 2024,
            top_p: 0.7
        })
        for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
                const newContent = chunk.choices[0].delta.content;
                onChunk(newContent)
            }  
        }
    } catch (err) {
        console.error(err.message)
    } 
}
