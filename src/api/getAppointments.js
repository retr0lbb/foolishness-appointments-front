import { api } from ".";

export async function getAppointments(cpf){
    const response = await api.get(`/appointments?cpf=${cpf}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar consultas');
      }

      return data
}