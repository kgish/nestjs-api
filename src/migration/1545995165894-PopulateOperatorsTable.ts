import { MigrationInterface, QueryRunner } from 'typeorm';

import { IOperator, operators } from './data/operators.data';

export class PopulateOperatorsTable1545995165894 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DELETE FROM operator');
    operators.forEach(operator => {
      operator.contract.forEach(contract => {
        queryRunner.query(`INSERT INTO operator (code, name) VALUES ('${contract}','${operator.name}');`);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
