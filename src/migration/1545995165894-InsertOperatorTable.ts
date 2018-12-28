import { MigrationInterface, QueryRunner } from 'typeorm';

import { IOperator, Operators } from './data/operators.data';

export class InsertOperatorTable1545995165894 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DELETE FROM "operator"');
    Operators.forEach((operator: IOperator) => {
      operator.contract.forEach(contract => {
        queryRunner.query(`INSERT INTO "operator" (code, name) VALUES ('${contract}','${operator.name}')`);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DELETE FROM "operator"');
  }

}
