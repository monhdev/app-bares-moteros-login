import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonList, IonTabButton, IonIcon, IonLabel, IonTab, IonTitle, IonContent, IonItem, IonThumbnail } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { library, playCircle, radio, search, locationOutline, peopleCircleOutline, calendarClearOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);



  constructor() {
    addIcons({ triangle, ellipse, square, library, playCircle, radio, search, locationOutline, peopleCircleOutline, calendarClearOutline, personOutline });
  }
}



