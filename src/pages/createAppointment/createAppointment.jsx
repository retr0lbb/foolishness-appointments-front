import { useEffect, useState } from 'react';
import { getAvailableDoctors } from '../../api/getDoctors';
import { createAppointment } from '../../api/createAppointment';
import { useNavigate } from 'react-router';

// CSS Modules simulado como objeto
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    position: 'relative'
  },
  progressLine: {
    position: 'absolute',
    top: '15px',
    left: '0',
    right: '0',
    height: '2px',
    backgroundColor: '#e0e0e0',
    zIndex: 0
  },
  progressLineFilled: {
    position: 'absolute',
    top: '15px',
    left: '0',
    height: '2px',
    backgroundColor: '#1e3a8a',
    zIndex: 0,
    transition: 'width 0.3s ease'
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white'
  },
  stepCircle: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#666',
    transition: 'all 0.3s ease'
  },
  stepCircleActive: {
    backgroundColor: '#1e3a8a',
    color: 'white'
  },
  stepCircleCompleted: {
    backgroundColor: '#1e3a8a',
    color: 'white'
  },
  stepLabel: {
    fontSize: '12px',
    marginTop: '5px',
    color: '#666',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  radioOptionSelected: {
    borderColor: '#1e3a8a',
    backgroundColor: '#dbeafe'
  },
  radioInput: {
    marginRight: '10px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    gap: '10px'
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: 'bold'
  },
  buttonPrimary: {
    backgroundColor: '#1e3a8a',
    color: 'white'
  },
  buttonSecondary: {
    backgroundColor: '#e0e0e0',
    color: '#333'
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333'
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px'
  },
  summary: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '15px'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee'
  },
  summaryLabel: {
    fontWeight: 'bold',
    color: '#666'
  },
  summaryValue: {
    color: '#333'
  }
};

export default function CreateAppointment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [doctors, setDoctors] = useState([])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    address: '',
    phone: '',
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    paymentMethod: ''
  });

  useEffect(() => {
    getAvailableDoctors().then(data => {setDoctors(data.data.doctors); console.log(data.data.doctors)})
  }, [])


  const paymentMethods = [
    { id: 'cartao', name: 'Cartão de Crédito/Débito', icon: '💳' },
    { id: 'dinheiro', name: 'Dinheiro', icon: '💵' },
    { id: 'convenio', name: 'Convênio', icon: '🏥' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoctorSelect = (doctor) => {
    setFormData(prev => ({
      ...prev,
      doctor: doctor.id,
      specialty: doctor.specializations
    }));
  };

  const handlePaymentSelect = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method.name }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async() => {
  try {
    await createAppointment({
      medicId: formData.doctor,
      patientCpf: formData.cpf,
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      staffCode: 1,
      date: formData.date,
      time: formData.time,
      paymentMethod: formData.paymentMethod
    });
    
    alert('Exame confirmado com sucesso!');

    navigate("/")
    
    // Opcional: limpar formulário ou redirecionar
    // setFormData({ ... valores iniciais ... });
    // setCurrentStep(1);
    
  } catch (error) {
    alert(error.message || 'Erro ao confirmar exame');
  }
};

  const progressPercentage = ((currentStep - 1) / 3) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.progressBar}>
        <div style={styles.progressLine}></div>
        <div style={{...styles.progressLineFilled, width: `${progressPercentage}%`}}></div>
        
        {[1, 2, 3, 4].map((step) => (
          <div key={step} style={styles.step}>
            <div style={{
              ...styles.stepCircle,
              ...(currentStep === step ? styles.stepCircleActive : {}),
              ...(currentStep > step ? styles.stepCircleCompleted : {})
            }}>
              {currentStep > step ? '✓' : step}
            </div>
            <span style={styles.stepLabel}>
              {step === 1 && 'Dados'}
              {step === 2 && 'Médico'}
              {step === 3 && 'Data/Hora'}
              {step === 4 && 'Pagamento'}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.formContainer}>
        {currentStep === 1 && (
          <div>
            <h2 style={styles.title}>Dados do Paciente</h2>
            <p style={styles.subtitle}>Preencha suas informações pessoais</p>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Nome Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Digite seu nome completo"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="000.000.000-00"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="rua tal de na"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 style={styles.title}>Escolha o Médico</h2>
            <p style={styles.subtitle}>Selecione o médico e a especialidade</p>
            
            <div style={styles.radioGroup}>
              {doctors.map((doctor) => (
                <label
                  key={doctor.id}
                  style={{
                    ...styles.radioOption,
                    ...(formData.doctor === doctor.name ? styles.radioOptionSelected : {})
                  }}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <input
                    type="radio"
                    name="doctor"
                    value={doctor.name}
                    checked={formData.doctor === doctor.id}
                    onChange={() => {}}
                    style={styles.radioInput}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{doctor.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{doctor.specializations}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 style={styles.title}>Data e Horário</h2>
            <p style={styles.subtitle}>Escolha quando deseja realizar o exame</p>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Data</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Horário</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 style={styles.title}>Método de Pagamento</h2>
            <p style={styles.subtitle}>Como deseja realizar o pagamento?</p>
            
            <div style={styles.radioGroup}>
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  style={{
                    ...styles.radioOption,
                    ...(formData.paymentMethod === method.name ? styles.radioOptionSelected : {})
                  }}
                  onClick={() => handlePaymentSelect(method)}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.name}
                    checked={formData.paymentMethod === method.name}
                    onChange={() => {}}
                    style={styles.radioInput}
                  />
                  <span style={{ fontSize: '24px', marginRight: '10px' }}>{method.icon}</span>
                  <span style={{ fontWeight: 'bold' }}>{method.name}</span>
                </label>
              ))}
            </div>

            <div style={styles.summary}>
              <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Resumo do Agendamento</h3>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Paciente:</span>
                <span style={styles.summaryValue}>{formData.name}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Médico:</span>
                <span style={styles.summaryValue}>{formData.doctor}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Especialidade:</span>
                <span style={styles.summaryValue}>{formData.specialty}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Data:</span>
                <span style={styles.summaryValue}>{formData.date}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Horário:</span>
                <span style={styles.summaryValue}>{formData.time}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Pagamento:</span>
                <span style={styles.summaryValue}>{formData.paymentMethod}</span>
              </div>
            </div>
          </div>
        )}

        <div style={styles.buttonGroup}>
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              style={{...styles.button, ...styles.buttonSecondary}}
            >
              Voltar
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              style={{...styles.button, ...styles.buttonPrimary, marginLeft: 'auto'}}
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{...styles.button, ...styles.buttonPrimary, marginLeft: 'auto'}}
            >
              Confirmar Exame
            </button>
          )}
        </div>
      </div>
    </div>
  );
}