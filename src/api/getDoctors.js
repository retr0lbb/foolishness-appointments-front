import { api } from "./index";

export async function getAvailableDoctors(){
    const response = await api.get("/doctors")

    if(response.status !== 200){
        return alert("Nao foi possivel recuperar os medicos tente novamente mais tarde")
    }

    const data = response.data

    return {data}
}