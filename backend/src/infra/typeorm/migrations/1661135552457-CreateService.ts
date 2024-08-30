import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateService1661135552457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "services",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "type",
                            type: "varchar"
                        },
                        {
                            name: "payment",
                            type: "varchar"
                        },
                        {
                            name: "description",
                            type: "varchar"
                        },
                        {
                            name: "value",
                            type: "numeric"
                        },
                        {
                            name: "date",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "customer_id",
                            type: "uuid",
                            isNullable: true
                        },
                    ],
                    foreignKeys: [
                        {
                            name: "FKCustomerId",
                            referencedTableName: "customers",
                            referencedColumnNames: ["id"],
                            columnNames: ["customer_id"],
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("services");
    }

}