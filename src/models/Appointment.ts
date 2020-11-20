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

// Entitiy no tupeorm éalgo que vai ser salvo no banco de dados
// quando vc colcoca em cima da classe siginifca que vc esta passando a classe
// como parâmetro para o @Entity
// nesse caso ai a classe a partir de agora vai salvar diretamente na tabela
// appointments
@Entity('appointments')
class Appointment {
    // definindo o tipo no BD, essa opção é para utilizar no caso de um id
    // esta sendo incializado de forma estática pelo metodo uuid incluso no prorpio typeorm
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // definindo como coluna normal
    // referência pro prestador de serviço cadastrado em User
    @Column()
    provider_id: string;

    // provider: User cira uma instancia de User, ManyToOne fala qual tipo de relaiconamento
    // JoinColum fala qual especifica que o qual avlor a proprieade irá reeber
    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    // definindo como coluna normal, e recebendo especificações d timestamp
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
