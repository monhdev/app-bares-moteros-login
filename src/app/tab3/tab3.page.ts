import { Component } from '@angular/core';
import { IonAvatar, IonInput, IonCardContent, IonCard, IonCardTitle, IonCardSubtitle, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonItem, IonCardHeader, IonLabel, IonIcon, IonList, IonChip } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonChip, IonList, IonAvatar, IonInput, IonIcon, IonCardContent, IonLabel, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonItem, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader],
})
export class Tab3Page {
  authService: any;
  constructor() {}

   logout() {
    this.authService.logout();
  }
}
