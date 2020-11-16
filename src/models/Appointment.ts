import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// quando vc colcoca em cima da classe siginifca que vc esta passando a classe
// como parâmetro para o @Entity
// nesse caso ai a classe a partir de agora vai salvar diretamente na tabela
// appointments
@Entity('appointments')
class Appointment {
    // definindo o tipo no BD
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // definindo como coluna
    @Column()
    provider: string;

    // definindo como coluna
    @Column('timestamp with time zone')
    date: Date;
}

export default Appointment;
