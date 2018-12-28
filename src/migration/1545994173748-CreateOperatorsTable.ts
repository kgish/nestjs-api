import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOperatorsTable1545994173748 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "username" text NOT NULL, "password" text NOT NULL, "operatorId" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "operator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_7be1e05da3f612fbb2f4f138b7c" UNIQUE ("code"), CONSTRAINT "PK_8b950e1572745d9f69be7748ae8" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_02680328b0bc6de5319b274c2c6" FOREIGN KEY ("operatorId") REFERENCES "operator"("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_02680328b0bc6de5319b274c2c6"`);
    await queryRunner.query(`DROP TABLE "operator"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }

}
