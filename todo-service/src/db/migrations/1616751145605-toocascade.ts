import {MigrationInterface, QueryRunner} from "typeorm";

export class toocascade1616751145605 implements MigrationInterface {
    name = 'toocascade1616751145605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_list" DROP CONSTRAINT "FK_bfa6d54c694134b94043d51e783"`);
        await queryRunner.query(`ALTER TABLE "todo_list" ADD CONSTRAINT "FK_bfa6d54c694134b94043d51e783" FOREIGN KEY ("parentTodoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_list" DROP CONSTRAINT "FK_bfa6d54c694134b94043d51e783"`);
        await queryRunner.query(`ALTER TABLE "todo_list" ADD CONSTRAINT "FK_bfa6d54c694134b94043d51e783" FOREIGN KEY ("parentTodoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
