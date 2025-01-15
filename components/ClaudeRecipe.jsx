import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe(props) {
    return( props.loading 
        ? <span className="loader"></span>
        : (props.recipe && 
            <section className="suggested-recipe-container" aria-live="polite">
            <h2>AI Chef Recommends:</h2>
            <ReactMarkdown> 
                {props.recipe}
            </ReactMarkdown>
            <div ref={props.ref}></div>
            </section> 
        )    
    )
}











