import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PromptUpdateService {

  constructor(updates: SwUpdate) {
      updates.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(evt => {
            console.log('A new version of the app is out', evt);
            if (confirm('A new version of the app is out. Do you want to update the page now?')) {
                document.location.reload(); // Reload the page to update to the latest version.
            }
        });

      updates.unrecoverable.subscribe(event => {
          alert(
              'An error occurred that we cannot recover from:\n' +
              event.reason +
              '\n\nPlease reload the page.'
          );
      });
  }

}
