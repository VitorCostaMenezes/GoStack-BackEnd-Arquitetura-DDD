import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        // o metodo findOne retorna o primeiro elemnto encontrado
        // que atende à condição
        // nesse exemplo a condião é ser igua
        const findAppointment = await this.findOne({
            // where: { date: date },
            // busca o elemnto em apointmnet que a date seja igual ao parâmetro passado date
            where: { date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
