import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {

  })
  .catch(err => console.log(err));
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  return false;
};
window.addEventListener("error", function (e) {
  return false;
});
const tabsFs = 'There is another tab open with offline';
interface UnhandledRejection extends Event {
  reason: {message: string};
}
window.addEventListener('unhandledrejection', (e: UnhandledRejection) => {
  console.log(e);
  if (e.reason && e.reason.message.startsWith(tabsFs)) {
    alert('Um die App Offline zu nutzten dürfen Sie nur einen Tab mit dieser Website offen haben, bitte schließen sie die anderen Tabs');
  }
});
