import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PromptUpdateService {

  constructor(updates: SwUpdate) {
      updates.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(evt => {
            console.log('New version of the app', evt.latestVersion);
            if (confirm('New version of the service is available. Reload the page?')) {
                // Reload the page to update to the latest version.
                location.reload();
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
