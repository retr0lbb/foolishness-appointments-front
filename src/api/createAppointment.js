import { api } from ".";

export async function createAppointment(data) {
  try {
    // 1. Verifica se o paciente existe
    let patientCpf = data.patientCpf;
    
    try {
      const existsUser = await api.get(`/patients/cpf?cpf=${data.patientCpf}`);
      
      if (existsUser.status === 200 && existsUser.data.patient) {
        patientCpf = existsUser.data.patient.cpf; // Usa o CPF confirmado
      }
    } catch (error) {
      // Se retornar 404, o paciente não existe
      if (error.response?.status === 404) {
        // 2. Cria o paciente se não existir
        await api.post("/patients", {
          address: data.address,
          cpf: data.patientCpf,
          name: data.name,
          phone: data.phone
        });
      } else {
        throw error;
      }
    }

    // 3. Combina data e hora em um único datetime
    const dateTimeString = `${data.date}T${data.time}:00`;

    // 4. Cria o agendamento - NOMES CORRETOS!
    const result = await api.post("/appointments", {
      patientCpf: patientCpf,           // ✅ patientCpf
      medicId: data.medicId,             // ✅ medicId
      staffCode: data.staffCode,         // ✅ staffCode
      dateTime: dateTimeString           // ✅ dateTime
    });

    console.log("Agendamento criado:", result.data);
    return result.data;

  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    
    if (error.response) {
      throw new Error(error.response.data.message || "Erro ao criar agendamento");
    } else if (error.request) {
      throw new Error("Erro de conexão com o servidor");
    } else {
      throw error;
    }
  }
}