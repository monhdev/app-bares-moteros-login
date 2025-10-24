import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, peopleCircleOutline, calendarClearOutline, personOutline} from 'ionicons/icons';
import { PushService } from 'src/app/services/push.service';
import { Capacitor } from '@capacitor/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  pushService = inject(PushService);
  auth = inject(Auth);

  constructor() {
    addIcons({
      locationOutline,
      peopleCircleOutline,
      calendarClearOutline,
      personOutline
    });
  }

  async ngOnInit() {
    // Solo si está en un dispositivo real
    if (Capacitor.isNativePlatform()) {
      // Esperar a que Firebase cargue el usuario
      const checkUser = setInterval(async () => {
        if (this.auth.currentUser) {
          clearInterval(checkUser);
          try {
            await this.pushService.registerNotifications();
            await this.pushService.addListeners();
            console.log('Push notifications initialized ✅');
          } catch (err) {
            console.error('Error registering for push notifications', err);
          }
        }
      }, 500);
    }
  }
}
