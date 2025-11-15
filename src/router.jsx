import { Route, Routes } from "react-router";
import { Home } from "./pages/home/home";
import CreateAppointment from "./pages/createAppointment/createAppointment";


export function DOMRouter(){
    return(
        <Routes>
            <Route Component={Home} path="/"></Route>
            <Route Component={CreateAppointment} path="/appointment/add"></Route>
        </Routes>
    )
}