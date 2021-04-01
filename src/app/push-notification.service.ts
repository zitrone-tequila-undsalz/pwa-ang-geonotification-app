import { Injectable } from '@angular/core';
//importataan http jotta saadaan pyyntö verkon yli
import { HttpClient } from '@angular/common/http';

const SERVER_URL = 'http://localhost:3000/subscription';

//huomaa että injectable on olio!
@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription);
  }
}
