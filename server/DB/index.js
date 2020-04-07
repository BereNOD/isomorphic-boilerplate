/* @flow strict */

import MySQL from 'mysql2/promise';
import Promise from 'bluebird';

const DBExec = async (sql: string, args: Array<string | number>): Promise<[[], []]> => {
  const connection = await MySQL
    .createConnection({
      host: process.env.MYSQL_HOST,
      user: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      Promise
    });

  return connection.execute(sql, args);
};

export default DBExec;
