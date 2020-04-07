const normalizePort = (val) => {
  const port = Number.parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

export default normalizePort;
