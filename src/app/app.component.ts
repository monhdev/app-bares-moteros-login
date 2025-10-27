import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // necesario para *ngIf
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SplashComponent } from './splash/splash.component';

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
    // Ocultamos el splash después de 4 segundos
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigateByUrl('/login'); // o '/home'
    }, 4000);
  }
}
