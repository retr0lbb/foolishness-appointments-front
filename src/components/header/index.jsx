import style from "./index.module.css"

export function Header(){
 return(
    <header className={`${style.wrapper}`}>
        <div className={`${style.logo}`}>
            <span>⚕️</span> 
            <p>MEDIC CARE</p>
        </div>
    </header>  
 ) 
}