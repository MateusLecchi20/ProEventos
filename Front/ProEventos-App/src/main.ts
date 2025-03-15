import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Verifica se está rodando no navegador antes de importar Bootstrap
if (typeof document !== 'undefined') {
  import('bootstrap');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));