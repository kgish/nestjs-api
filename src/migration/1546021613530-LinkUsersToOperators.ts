import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../user/interfaces/user.interface';

export class LinkUsersToOperators1546021613530 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('SELECT * from "user"').then(users => {
      users.forEach(user => {
        queryRunner.query('SELECT * FROM "operator" ORDER BY RANDOM() LIMIT 1').then(operator => {
          queryRunner.query(`UPDATE "user" SET operatorid = '${operator[0].id}' where id = '${user.id}'`);
        });
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
