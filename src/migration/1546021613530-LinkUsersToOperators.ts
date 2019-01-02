/* tslint:disable:max-line-length */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../user/interfaces/user.interface';

export class LinkUsersToOperators1546021613530 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const users = await queryRunner.query('SELECT * from "user"');

    users.forEach(async user => {
      // Select a random operator
      const operator = await queryRunner.query('SELECT * FROM "operator" ORDER BY RANDOM() LIMIT 1');
      // Link the user to this operator.
      queryRunner.query('UPDATE "user" SET "operatorId" = $2 WHERE "id" = $1', [user.id, operator[0].id]);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('UPDATE "user" SET "operatorId" = null');
  }

}
