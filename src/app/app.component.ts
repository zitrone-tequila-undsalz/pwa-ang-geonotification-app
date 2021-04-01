import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

const VAPID_PUBLIC =
  'BLv0qOMeqivgcdJ_dDwavZYnyRZpZpqENp4TAuhm2cLLgUHNf5tyJ9lqazgQ3K0a0OGiYU3YJF2XfGT4ZrfeM94';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ang-geonotipwa';

  constructor(swPush: SwPush, pushService: PushNotificationService) {
    //tsekataan että oikea asiakas on varmasti tulossa, eikä esimerkiksi valeasiakas.
    // PYYNNÖT PALVELIMELLE KANNATTAA AINA TEHDÄ SERVICEEN, EI KOSKAAN KOMPONENTTIIN NIINKUIN TÄSSÄ.
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then((subscription) => {
          // lähetetään subaus eli pyyntö serverille servicen kautta
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })

        .catch(console.error);
    }
  }
}
