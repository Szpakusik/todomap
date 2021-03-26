import {MigrationInterface, QueryRunner} from "typeorm";

export class mymigration1616496448092 implements MigrationInterface {
    name = 'mymigration1616496448092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo_list" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "parentTodoId" integer, CONSTRAINT "REL_bfa6d54c694134b94043d51e78" UNIQUE ("parentTodoId"), CONSTRAINT "PK_1a5448d48035763b9dbab86555b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "eisenhoverQuarter" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP NOT NULL DEFAULT now(), "parentListId" integer, "childListId" integer, CONSTRAINT "REL_3078f1834c6d13813a8385eb6f" UNIQUE ("childListId"), CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deadline" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "todoId" integer, CONSTRAINT "PK_9b68db28fc035ed8a84691bfbaf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo_list" ADD CONSTRAINT "FK_bfa6d54c694134b94043d51e783" FOREIGN KEY ("parentTodoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_920ecccd4940a635e62b5457590" FOREIGN KEY ("parentListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_3078f1834c6d13813a8385eb6f2" FOREIGN KEY ("childListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deadline" ADD CONSTRAINT "FK_33b86c3736c99c8307f3f021aad" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deadline" DROP CONSTRAINT "FK_33b86c3736c99c8307f3f021aad"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_3078f1834c6d13813a8385eb6f2"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_920ecccd4940a635e62b5457590"`);
        await queryRunner.query(`ALTER TABLE "todo_list" DROP CONSTRAINT "FK_bfa6d54c694134b94043d51e783"`);
        await queryRunner.query(`DROP TABLE "deadline"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TABLE "todo_list"`);
    }

}
