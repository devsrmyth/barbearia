import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomer1661030894235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "customers",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar"
                        },
                        {
                            name: "phone",
                            type: "varchar"
                        },
                        {
                            name: "birth",
                            type: "timestamp"
                        }
                    ],
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customers");
    }

}