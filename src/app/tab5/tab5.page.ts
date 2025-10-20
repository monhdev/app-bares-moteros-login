import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon,
  IonItem, IonLabel, IonAvatar, IonInput, IonFabButton, Platform, AlertController, LoadingController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/interface-bares';
import { AvatarService } from 'src/app/services/avatar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera, imageOutline, personOutline, mailOutline, bicycleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab5',
  standalone: true,
  imports: [
    IonFabButton, IonInput, IonAvatar, IonLabel, IonItem, IonButton,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, ReactiveFormsModule, IonIcon
  ],
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss']
})
export class Tab5Page {

  router = inject(Router);
  userService = inject(UserService);
  auth = inject(Auth);
  avatarService = inject(AvatarService);
  platform = inject(Platform);
  alertController = inject(AlertController);
  loadingController = inject(LoadingController);
  authService = inject(AuthService);

  profileForm!: FormGroup;
  user!: IUser;

  // Webcam y preview
  showWebcam = false;
  @ViewChild('video', { static: false }) videoRef!: ElementRef<HTMLVideoElement>;
  videoStream!: MediaStream;

  // Avatar
  userPhoto: { webviewPath: string } | null = null;

  constructor() {
    addIcons({ camera, imageOutline, personOutline, mailOutline, bicycleOutline });
  }

  ngOnInit() {
    this.getUserInfo();
  }

  logout() {
    this.authService.logout();
  }

  getUserInfo(): void {
    this.userService.getUserById(this.auth.currentUser?.uid!).subscribe(user => {
      this.user = user!;
      this.createProfileForm();
      if (this.user.avatar) this.userPhoto = { webviewPath: this.user.avatar };
    });
  }

  createProfileForm(): void {
    this.profileForm = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      nombre: new FormControl(this.user.nombre || ''),
      moto: new FormControl(this.user.moto || '')
    });
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const updatedUser: IUser = { ...this.user, ...this.profileForm.value };
      this.userService.updateUser(updatedUser).then(() => {
        console.log('User updated successfully');
      });
    } else {
      console.log('Form is invalid');
    }
  }

  /* ----------------- SUBIR IMAGEN DESDE GALERÍA (móvil) ----------------- */
  async changeImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });
      await this.uploadToFirebase(image);
    } catch (e) {
      console.error('Error al seleccionar imagen:', e);
    }
  }

  /* ----------------- TOMAR FOTO ----------------- */
  async takePhoto() {
    if (this.platform.is('hybrid')) {
      // Móvil
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      await this.uploadToFirebase(image);
    } else {
      // Web: mostrar webcam
      this.showWebcam = true;
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.videoRef.nativeElement.srcObject = this.videoStream;
        this.videoRef.nativeElement.play();
      } catch (err) {
        console.error('Error accediendo a la webcam: ', err);
      }
    }
  }

  /* ----------------- CAPTURAR FOTO WEB ----------------- */
  async captureWebPhoto() {
    const video = this.videoRef.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg');

    // Detener webcam
    this.videoStream.getTracks().forEach(track => track.stop());
    this.showWebcam = false;

    const base64Data = dataUrl.split(',')[1];
    const fakePhoto = { base64String: base64Data } as Photo;

    await this.uploadToFirebase(fakePhoto);
  }

  /* ----------------- SUBIR A FIREBASE ----------------- */
  private async uploadToFirebase(image: Photo) {
    if (!image?.base64String) return;

    const loading = await this.loadingController.create({ message: 'Subiendo imagen...' });
    await loading.present();

    const result = await this.avatarService.uploadImage(image);
    await loading.dismiss();

    if (!result) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo subir la imagen al servidor.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.user.avatar = result;
      this.userPhoto = { webviewPath: result };
      await this.userService.updateUser({ ...this.user, avatar: result });
    }
  }

  /* ----------------- ACTION SHEET ----------------- */
  async showActionSheet() {
    if (!this.userPhoto) return;
    const actionSheet = await this.alertController.create({
      header: 'Foto de perfil',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            this.userPhoto = null;
            this.user.avatar = '';
            await this.userService.updateUser(this.user);
          }
        },
        { text: 'Cancelar', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }
}
