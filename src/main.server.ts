import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from '@/layout/app';
import { config } from '@/core/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
