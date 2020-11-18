/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
// o startOfHours coloca o minuto , segundo e milisegundo como 0, ou seja no começo da hora

import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

// importando o model
import Appointment from '../models/Appointment';
// importando o repositorio
import AppointmentsRepository from '../repositories/AppointmentsRepository';

// criando uma interface
interface Request {
    date: Date;
    provider_id: string;
}

class CreateAppointmentService {
    // Criando o metodo execute, que recebe dois parâmetros definidos pela tipagem request
    // o execute retorna um Appointment
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        // Recebendo o valor de date e executando  a função startHours
        // e aramazenando em appointmentDate
        // o startOfHours coloca o minuto , segundo e milisegundo como 0, ou seja no começo da hora
        const appointmentDate = startOfHour(date);

        // Armazenando na variavel o valor obtido através do metod findByDate
        // o metodo verifica se ja existe um valor armazenado no memso horário
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            // passando o valor de appointmentDate como parâmetro pro metodo findByDate
            appointmentDate,
        );

        // Os services não têm acesso aos response ou requests
        // verifica se o metodo findBydate retornou true
        // se for true exibe um erro
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked.');
        }

        // armazena em appointment o valor criado através do meotod create
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        // salvando no banco de dados
        // tem que ser uma função assincrona pq é algo que pdoe demorar
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
