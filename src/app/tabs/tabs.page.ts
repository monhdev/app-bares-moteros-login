import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonList, IonTabButton, IonIcon, IonLabel, IonTab, IonTitle, IonContent, IonItem, IonThumbnail } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { library, playCircle, radio, search, locationOutline, peopleCircleOutline, calendarClearOutline, personOutline } from 'ionicons/icons';
import { PushService } from 'src/app/services/push.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  pushService: PushService = inject(PushService);


  constructor() {
    addIcons({ triangle, ellipse, square, library, playCircle, radio, search, locationOutline, peopleCircleOutline, calendarClearOutline, personOutline });
    if (Capacitor.isNativePlatform()) {
      this.pushService.registerNotifications().then(() => {
        this.pushService.addListeners();
      }).catch(err => {
        console.error('Error registering for push notifications', err);
      });
    }
  }
}



