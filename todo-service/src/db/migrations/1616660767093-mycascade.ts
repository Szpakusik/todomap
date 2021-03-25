import {MigrationInterface, QueryRunner} from "typeorm";

export class mycascade1616660767093 implements MigrationInterface {
    name = 'mycascade1616660767093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_list" DROP CONSTRAINT "FK_bfa6d54c694134b94043d51e783"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_3078f1834c6d13813a8385eb6f2"`);
        await queryRunner.query(`ALTER TABLE "todo_list" ADD CONSTRAINT "FK_bfa6d54c694134b94043d51e783" FOREIGN KEY ("parentTodoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_3078f1834c6d13813a8385eb6f2" FOREIGN KEY ("childListId") REFERENCES "todo_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_3078f1834c6d13813a8385eb6f2"`);
        await queryRunner.query(`ALTER TABLE "todo_list" DROP CONSTRAINT "FK_bfa6d54c694134b94043d51e783"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_3078f1834c6d13813a8385eb6f2" FOREIGN KEY ("childListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_list" ADD CONSTRAINT "FK_bfa6d54c694134b94043d51e783" FOREIGN KEY ("parentTodoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
