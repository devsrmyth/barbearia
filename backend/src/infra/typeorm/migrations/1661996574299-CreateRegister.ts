import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRegister1661996574299 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "registers",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "isIncoming",
                            type: "boolean"
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
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("registers");
    }

}
