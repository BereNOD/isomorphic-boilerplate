import Log from '/utils/Log.js';

function onListening() {
  const addr = this.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  Log(`Listening on ${bind}`);
}

export default onListening;
