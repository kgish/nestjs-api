import { MigrationInterface, QueryRunner } from 'typeorm';

import * as faker from 'faker';

export class InsertUserTable1546019806360 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`INSERT INTO "user" (username, password, role) VALUES ('admin@coin.nl','admin','admin')`);
    queryRunner.query(`INSERT INTO "user" (username, password, role) VALUES ('support@coin.nl','support','support')`);
    for (let i = 0; i < 300; i++) {
      const username = faker.internet.userName();
      queryRunner.query(`INSERT INTO "user" (username, password, role) VALUES ('${username}','${username}', 'user')`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DELETE FROM "user"');
  }
}
