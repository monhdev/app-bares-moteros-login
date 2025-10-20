import { inject, Injectable, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private ngZone = inject(NgZone);

  constructor() {}

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user!.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    if (!user) {
      console.error('No hay usuario autenticado');
      return null;
    }

    const path = `uploads/${user.uid}/profile.webp`;
    const storageRef = ref(this.storage, path);

    try {
      console.log('Subiendo imagen a Firebase Storage...');
      if (!cameraFile.base64String) {
        console.error('No hay base64String en cameraFile');
        return null;
      }

      // Subir la imagen
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      console.log('Imagen subida, obteniendo URL...');

      // 👇 Aquí usamos NgZone para volver al contexto de Angular
      return this.ngZone.run(async () => {
        const imageUrl = await getDownloadURL(storageRef);
        console.log('URL obtenida:', imageUrl);
        return imageUrl;
      });

    } catch (e) {
      console.error('Error subiendo imagen:', e);
      return null;
    }
  }
}
