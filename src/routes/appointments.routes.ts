// Importando o express
import { Router } from 'express';
// parseIso converte uma string para um formato date
import { parseISO } from 'date-fns';
// Importando o repositório
import AppointmentsRepository from '../repositories/AppointmentsRepository';
// importando o service
import CreateAppointmentService from '../services/CreateAppointmentService';

// DTO - Data Transfer Object = tranferencia de dados de um arquivo para o outro

const appointmentsRouter = Router(); // definindo a variavel como uma rota

// instanciando a classe em appointmentsRepository
// a partir de agora é póssivel acessar os metodos existentes na classe
// AppointmentsRepository
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    // acessando o metodo all da Classe AppointmentsRepository
    // e armazenando em appointments
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

// Como o /appointments ja esta definido no arquivo index.ts basta usar o / aqui
appointmentsRouter.post('/', (request, response) => {
    // Tratamento de erro
    try {
        const { provider, date } = request.body;

        // Recebe do date do body uma string tranforma em formato date
        // depois zera os minutos, segundos, milsgundos
        // e aramazena no variavel parse date
        const parsedDate = parseISO(date);

        // Instanciando a classe CreateAppointmentService
        // E armazenando o valor em createAppointment
        // Passando o valor do repository via parâmetro
        const createAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );

        // chamando o metodo execute e passando o valor de date e provider como parâmetro
        const appointment = createAppointment.execute({
            date: parsedDate,
            provider,
        });

        // retornando uma resposta
        return response.json(appointment);
    } catch (err) {
        // retornando um codigo de erro e uma mensagem
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
