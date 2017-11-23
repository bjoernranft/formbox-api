import "reflect-metadata";

import { ReflectiveInjector } from "injection-js";
import { AppMain } from "./app/app.main";

// Hier müssen alle Klassen eingetragen werden,
// die injiziert werden sollen.
const injector = ReflectiveInjector.resolveAndCreate([
  AppMain
]);

// Startet die Anwendung über Dependency Injection.
injector.get(AppMain);