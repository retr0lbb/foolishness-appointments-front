import { useState } from 'react';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '30px',
    borderRadius: '8px',
    marginBottom: '30px',
    textAlign: 'center'
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold'
  },
  searchSection: {
    backgroundColor: '#f9f9f9',
    padding: '25px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  },
  button: {
    width: '100%',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#1e3a8a',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  appointmentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  appointmentCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '2px solid #e5e7eb',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #e5e7eb'
  },
  appointmentId: {
    fontSize: '12px',
    color: '#666',
    fontWeight: 'bold'
  },
  appointmentDate: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1e3a8a'
  },
  appointmentInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  infoLabel: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '4px'
  },
  infoValue: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#666'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '15px'
  },
  emptyText: {
    fontSize: '18px',
    marginBottom: '10px'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#1e3a8a',
    fontSize: '18px'
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #fca5a5'
  }
};

export default function PatientAppointments() {
  const [cpf, setCpf] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!cpf.trim()) {
      setError('Por favor, digite um CPF');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const response = await fetch(`http://localhost:3333/appointments?cpf=${cpf}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar consultas');
      }

      setAppointments(data.appointments || []);
    } catch (err) {
      setError(err.message || 'Erro ao buscar consultas');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCpf = (cpfString) => {
    return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Minhas Consultas</h1>
      </div>

      <div style={styles.searchSection}>
        <div style={styles.formGroup}>
          <label style={styles.label}>CPF do Paciente</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
            placeholder="Digite seu CPF (apenas números)"
            maxLength="11"
          />
        </div>
        <button onClick={handleSearch} style={styles.button}>
          Buscar Consultas
        </button>
      </div>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {loading && (
        <div style={styles.loading}>
          Carregando consultas...
        </div>
      )}

      {!loading && searched && appointments.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📅</div>
          <div style={styles.emptyText}>Nenhuma consulta encontrada</div>
          <p>Não há consultas agendadas para este CPF.</p>
        </div>
      )}

      {!loading && appointments.length > 0 && (
        <div style={styles.appointmentsList}>
          {appointments.map((appointment) => (
            <div key={appointment.id} style={styles.appointmentCard}>
              <div style={styles.appointmentHeader}>
                <span style={styles.appointmentId}>
                  Consulta #{appointment.id}
                </span>
                <span style={styles.appointmentDate}>
                  {formatDate(appointment.date)} às {formatTime(appointment.date)}
                </span>
              </div>
              
              <div style={styles.appointmentInfo}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>CPF do Paciente</span>
                  <span style={styles.infoValue}>{formatCpf(appointment.patient_cpf)}</span>
                </div>
                
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Médico</span>
                  <span style={styles.infoValue}>
                    {appointment.doctor_name || 'Não informado'}
                    {appointment.doctor_crm && ` - ${appointment.doctor_crm}`}
                  </span>
                </div>
                
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Código da Equipe</span>
                  <span style={styles.infoValue}>{appointment.staff_code}</span>
                </div>
                
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Status</span>
                  <span style={styles.infoValue}>Agendada</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}