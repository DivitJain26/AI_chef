import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export default function ClaudeRecipe(props) {
    return( props.loading 
        ? <span className="loader"></span>
        : (props.recipe && 
            <section className="suggested-recipe-container" aria-live="polite">
            <h2>AI Chef Recommends:</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}> 
                {props.recipe}
            </ReactMarkdown>
            <div ref={props.ref}></div>
            </section> 
        )    
    )
}











