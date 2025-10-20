import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonRouterLink, LoadingController, AlertController, IonButton } from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class LoginPage {

  title: string = 'Login';

  loginForm!: FormGroup; // Define the type of loginForm if using Reactive Forms

  constructor(private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router) {
    // Initialization logic can go here if needed
    this.createForm();
  }

  enviar() {
    // Logic to handle form submission can be added here
    console.log('Form submitted');
    const usuari = (document.getElementById('username') as HTMLInputElement).value;
    const contrasenya = (document.getElementById('password') as HTMLInputElement).value;
    console.log(`Usuari: ${usuari}, Contrasenya: ${contrasenya}`);
    // You can add further logic to handle the login process
  }

  enviarReactiveForm() {
    // Logic to handle form submission with Reactive Forms
    console.log('Reactive Form submitted', this.loginForm);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(`Username: ${username}, Password: ${password}`);
      // You can add further logic to handle the login process
    } else {
      console.log('Form is invalid');
    }
  }

  createForm() {
    // Logic to create a form can be added here if needed
    console.log('Creating form');
    // Creating Reactive Form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  goto() {
    console.log('Navigating to Login page');
  }

  async register() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.register(this.loginForm.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/', { replaceUrl: true });
		} else {
			this.showAlert('Registration failed', 'Please try again!');
		}
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.loginForm.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/', { replaceUrl: true });
		} else {
			this.showAlert('Login failed', 'Please try again!');
		}
	}

	async showAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

}
