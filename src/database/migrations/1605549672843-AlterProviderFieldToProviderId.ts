import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1605549672843
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // dropcollum recebe dois parâmetros, qual tabela quer acessar
        // e qual coluna quer deletar, ex: tabela appointments coluna provider
        await queryRunner.dropColumn('appointments', 'provider');
        // add colun, recebe dois parâmetro,qual tabela quer acessar
        // e a coluna quer adicionar
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    // o metodo down faz o contrário do up, basicamente ele esta desfazendo ou refazendo
    // o que foi feito acima só que em ordem reversa
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
