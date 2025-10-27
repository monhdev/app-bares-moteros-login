import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

// Registramos iconos que vamos a usar
addIcons({
  send,
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonApp, IonRouterOutlet, SplashComponent],
  template: `
    <ion-app>
      <!-- Mostrar splash mientras showSplash sea true -->
      <app-splash *ngIf="showSplash"></app-splash>

      <!-- App principal: router outlet -->
      <ion-router-outlet *ngIf="!showSplash"></ion-router-outlet>
    </ion-app>
  `,
})
export class AppComponent {
  showSplash = true;

  constructor(private router: Router) {
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigateByUrl('/login'); // o '/home'
    }, 4000);
  }
}
