const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const errorLogPath = path.join(logsDir, 'error.log');
const combinedLogPath = path.join(logsDir, 'combined.log');

const timestamp = () => new Date().toISOString();

const writeToFile = (filePath, message) => {
  fs.appendFile(filePath, message + '\n', (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to write log file:', err.message);
    }
  });
};

const format = (level, message) => `[${timestamp()}] [${level}] ${message}`;

const logger = {
  info: (message) => {
    const line = format('INFO', message);
    console.log(line);
    writeToFile(combinedLogPath, line);
  },
  warn: (message) => {
    const line = format('WARN', message);
    console.warn(line);
    writeToFile(combinedLogPath, line);
  },
  error: (message) => {
    const line = format('ERROR', message);
    console.error(line);
    writeToFile(combinedLogPath, line);
    writeToFile(errorLogPath, line);
  },
};

module.exports = logger;
