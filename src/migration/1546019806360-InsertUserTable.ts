import { MigrationInterface, QueryRunner } from 'typeorm';

import * as faker from 'faker';
import { hash } from 'bcryptjs';

export class InsertUserTable1546019806360 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    let password = await hash('admin', 10);
    await queryRunner.query(`INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3)`, ['admin@coin.nl', password, 'admin']);
    password = await hash('support', 10);
    await queryRunner.query(`INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3)`, ['support@coin.nl', password, 'support']);
    for (let i = 0; i < 300; i++) {
      const username = faker.internet.userName();
      password = await hash(username, 10);
      await queryRunner.query(`INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3)`, [username, password, 'user']);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DELETE FROM "user"');
  }
}
