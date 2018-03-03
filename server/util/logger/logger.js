/**
 * logger.js
 * 1. Timestamps
 * 2. Logging format
 * 3. Log destinations
 * 4.Support for log levels
 */
// system packages
const path = require('path');

// npm packages
import {createLogger, format, transports} from 'winston';

const {combine, colorize, timestamp, label, printf} = format;

const getLogDirectory = () => path.join(__dirname, '../../', 'logs');

const myFormat = printf(
  info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
);

const setupTransports = () => {
  const tempTransports = [
    new transports.File({
      filename: path.join(getLogDirectory(), 'error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(getLogDirectory(), 'combined.log'),
    }),
  ];
  if (process.env.NODE_ENV !== 'production') {
    tempTransports.push(
      new transports.Console({
        format: combine(colorize({all: true}), format.simple()),
      })
    );
  }
  return tempTransports;
};

const getLogger = labelName =>
  createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(label({label: labelName}), timestamp(), myFormat),
    transports: setupTransports(),
  });

module.exports = {
  getLogger,
};
