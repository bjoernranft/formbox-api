import 'reflect-metadata';

import * as dotenv from 'dotenv';

import { Logger } from 'ts-log-debug';
import { ReflectiveInjector } from 'injection-js';
import * as express from 'express';

import { AppMain } from './app/app.main';
import { DatabaseRouter } from './api/database.api';

dotenv.config();

const app = express();

const log = new Logger('FormBoxApi');

log.appenders
  .set('stdout', {
    type: 'stdout',
    levels: [ 'debug', 'info', 'trace' ]
  })
  .set('stderr', {
    type: 'stderr',
    levels: [ 'fatal', 'error', 'warn' ],
    layout: {
      type: 'pattern',
      pattern: '%d %p %c %X{user} %m%n'
    }
  });

// Hier müssen alle Klassen eingetragen werden,
// die injiziert werden sollen.
const injector = ReflectiveInjector.resolveAndCreate([
  AppMain,
  { provide: 'Logger', useValue: log },
  { provide: 'Application', useValue: app },
  { provide: 'DatabaseApi', useFactory: DatabaseRouter, deps: [ 'Logger' ] },
]);

// Startet die Anwendung über Dependency Injection.
injector.get(AppMain);