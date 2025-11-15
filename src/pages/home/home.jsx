import { Header } from "../../components/header"
import { List } from "../../components/box-grid"
import { BriefcaseMedical, ClipboardPlus, BanknoteArrowDown, List as IconList } from "lucide-react"
import style from "./home.module.css"


export function Home(){
    return(
        <main className={`${style.full}`}>
            <Header></Header>
            <div className={`${style.centerItem} ${style.full}`}>
                <p className={style.largeText}>O que você deseja fazer hoje?</p>
                <List>
                    <List.Item icon={<BriefcaseMedical />} title="Marcar Consulta" to="/appointment/add" />
                    <List.Item icon={<IconList />} title="Ver consultas" to="/appointment/list" />
                </List>
            </div>
        </main>
    )
}