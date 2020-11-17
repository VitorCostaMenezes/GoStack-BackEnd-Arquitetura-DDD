/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User';

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
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    // definindo como coluna
    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;

/*
 * Um para muitos (OneToOne)
 * Um para muitos (OneToMany)
 * Muitos para muitos (manyTomany)
 */
