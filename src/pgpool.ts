// import { Pool, PoolConfig } from 'pg-pool'; // does not work - what ???

import { Pool, PoolConfig } from 'pg';

async function startWithPool(): Promise<never> {
  process.env['BLUEBIRD_LONG_STACK_TRACES'] = '1';
  global.Promise = require('bluebird');

  const mypool = new Pool({
    application_name: `test`,
    database: 'work_queue_dev',
    user: 'donvoy',
    password: '',
    host: '127.0.0.1',
    port: 5499,
  } as PoolConfig);

  const client = await mypool.connect();
  mypool.on('error', error => {
    console.log('----- BOOM -------');
    console.log(error);
  });
  //  client.release();

  while (true) {
    const rows = await client.query('select 1');
    console.log(rows.rowCount);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

void startWithPool();
