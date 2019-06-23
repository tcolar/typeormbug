import { getConnectionOptions, createConnection, getManager } from 'typeorm';

async function startWithTypeOrm(): Promise<never> {
  process.env['BLUEBIRD_LONG_STACK_TRACES'] = '1';
  global.Promise = require('bluebird');

  const connectionOptions = await getConnectionOptions();
  const dbConnection = await createConnection(connectionOptions);
  const _orm = getManager();

  while (true) {
    const rows = await dbConnection.query('select 1');
    console.log(rows.length);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

void startWithTypeOrm();
