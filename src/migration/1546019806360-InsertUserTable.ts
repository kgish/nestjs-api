import { MigrationInterface, QueryRunner } from 'typeorm';

import * as faker from 'faker';

export class InsertUserTable1546019806360 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`INSERT INTO "user" (username, password) VALUES ('admin@coin.nl','admin')`);
    queryRunner.query(`INSERT INTO "user" (username, password) VALUES ('support@coin.nl','support')`);
    for (let i = 0; i < 300; i++) {
      const username = faker.internet.userName();
      queryRunner.query(`INSERT INTO "user" (username, password) VALUES ('${username}','${username}')`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DELETE FROM "user"');
  }
}
