import { Component, OnInit } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  // Animación del logo
  logoOptions = {
    path: '/assets/animations/logo.json',
    loop: false,
    autoplay: true,
  };

  // Animación de la barra de progreso
  progressOptions = {
    path: '/assets/animations/progress_bar.json',
    loop: true,   // barras de progreso se repiten
    autoplay: true,
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Mostrar splash durante 4 segundos y luego navegar al login
    setTimeout(() => {
      this.router.navigateByUrl('/login'); // o '/home' según tu ruta
    }, 4000); // 4000 ms = 4 segundos
  }
}
