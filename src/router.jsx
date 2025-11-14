import { Route, Routes } from "react-router";
import { Home } from "./pages/home/home";


export function DOMRouter(){
    return(
        <Routes>
            <Route Component={Home} path="/"></Route>
        </Routes>
    )
}