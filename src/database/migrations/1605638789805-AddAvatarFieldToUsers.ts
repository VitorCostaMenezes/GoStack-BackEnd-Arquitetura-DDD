import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// adicionando uma nova coluna que salva o caminho da imagem
// por isso o type é varchar, não é aocnselhavel salavr o arquivo diretamente no Banco
export default class AddAvatarFieldToUsers1601495109552
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }
}
