import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

// o @EntityRepository passa a classe Appointment repository para Appointment
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    // a classe é extendida à Repository que tem como model Appointmente
    // extendimento permite à classe AppointmentsRepository acessar os metodos do typeorm
    // presentes em Appointments ex:
    // find, findone, create, save, delete, remove e etc
    public async findByDate(date: Date): Promise<Appointment | null> {
        // o metodo findOne retorna o primeiro elemnto encontrado
        // que atende à condição
        // nesse exemplo a condião é ser igual a date
        // o findOne é uma função assincrona, por isso o await
        // precisa incluir o asyn e o Promise acima
        const findAppointment = await this.findOne({
            // where: { date: date },
            // busca o elemnto em apointmnet que a date seja igual ao parâmetro passado date
            // procura uma query aonde (where) date seja igual a date
            where: { date },
        });
        // realiza uma especie de if
        // se findAppointment existir, retorna ele mesmo, s enão retorna null
        return findAppointment || null;
    }
}

export default AppointmentsRepository;
