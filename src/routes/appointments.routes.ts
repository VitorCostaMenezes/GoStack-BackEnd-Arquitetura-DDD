/* eslint-disable camelcase */
// Importando o express
import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
// parseIso converte uma string para um formato date
import { parseISO } from 'date-fns';
// Importando o repositório
import AppointmentsRepository from '../repositories/AppointmentsRepository';
// importando o service
import CreateAppointmentService from '../services/CreateAppointmentService';
// importando o midleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// DTO - Data Transfer Object = tranferencia de dados de um arquivo para o outro

const appointmentsRouter = Router(); // definindo a variavel como uma rota

// aplicando a autenticação em todas as rotas do arquivo
// se quisesse em uma rota especifica, bastava inserir o esnureAuthenticated
// como sengundo parâmetro na rota ex:
// appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    // criando um instancia do repositoŕio via parâmetro
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // acessando o metodo all da Classe AppointmentsRepository
    // e armazenando em appointments
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

// Como o /appointments ja esta definido no arquivo index.ts basta usar o / aqui
appointmentsRouter.post('/', async (request, response) => {
    // Tratamento de erro
    // try {
    const { provider_id, date } = request.body;

    // Recebe do date do body uma string tranforma em formato date
    // depois zera os minutos, segundos, milsgundos
    // e aramazena no variavel parse date
    const parsedDate = parseISO(date);

    // Instanciando a classe CreateAppointmentService
    // E armazenando o valor em createAppointment
    // agora tem acaesso ao metodo execute
    const createAppointment = new CreateAppointmentService();

    // chamando o metodo execute e passando o valor de date e provider como parâmetro
    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    // retornando uma resposta
    return response.json(appointment);
    // } catch (err) {
    //     // retornando um codigo de erro e uma mensagem
    //     return response.status(400).json({ error: err.message });
    // }
});

export default appointmentsRouter;
