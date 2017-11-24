import 'reflect-metadata';

import { ReflectiveInjector } from 'injection-js';
import * as express from 'express';

import { AppMain } from './app/app.main';

const app = express();

// Hier müssen alle Klassen eingetragen werden,
// die injiziert werden sollen.
const injector = ReflectiveInjector.resolveAndCreate([
  AppMain,
  { provide: 'Application', useValue: app }
]);

// Startet die Anwendung über Dependency Injection.
injector.get(AppMain);