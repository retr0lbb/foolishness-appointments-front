import style from "./index.module.css"

function List(props){
    return(
        <div className={`${style.list}`}>
            {props.children}
        </div>
    )
}


function Item(props){
    return(
        <a href={props.to} className={`${style.listItem}`}>
            <div className={style.labelInline}>
                {props.icon}
                <p>{props.title}</p>
            </div>
        </a>
    )
}

List.Item = Item


export {List}