// forum.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, docData, query, orderBy, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface UserData {
  avatar: string;
  nombre: string;
}

export interface ForumPost {
  id?: string;
  avatar: string;
  nombre: string;
  texto: string;
  fecha: any;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // Obtener datos del usuario actual
  getCurrentUserData(): Observable<UserData | null> {
    return new Observable(observer => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        if (user) {
          console.log('Usuario autenticado:', user.uid);
          const userDocRef = doc(this.firestore, `users/${user.uid}`);

          docData(userDocRef).pipe(
            map((userData: any) => {
              console.log('Datos del usuario obtenidos:', userData);
              if (userData) {
                return {
                  avatar: userData.avatar || '',
                  nombre: userData.nombre || ''
                };
              }
              return null;
            })
          ).subscribe({
            next: (data) => observer.next(data),
            error: (err) => {
              console.error('Error obteniendo datos:', err);
              observer.error(err);
            }
          });
        } else {
          console.log('No hay usuario autenticado');
          observer.next(null);
        }
      });

      return () => unsubscribe();
    });
  }

  // Crear un nuevo post en el foro
  async createPost(texto: string): Promise<void> {
    try {
      const user = this.auth.currentUser;

      if (!user) {
        console.error('No hay usuario autenticado');
        throw new Error('Usuario no autenticado. Por favor inicia sesión.');
      }

      console.log('Creando post para usuario:', user.uid);

      // Obtener datos del usuario
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.error('No se encontró el documento del usuario');
        throw new Error('Usuario no encontrado en la base de datos');
      }

      const userData = userDocSnap.data();
      console.log('Datos usuario:', userData);

      const post = {
        avatar: userData['avatar'] || 'https://ionicframework.com/docs/img/demos/avatar.svg',
        nombre: userData['nombre'] || 'Usuario',
        texto: texto,
        fecha: new Date(),
        userId: user.uid
      };

      console.log('Post a guardar:', post);

      const postsRef = collection(this.firestore, 'posts');
      const docRef = await addDoc(postsRef, post);

      console.log('✅ Post guardado con ID:', docRef.id);
    } catch (error) {
      console.error('❌ Error completo al crear post:', error);
      throw error;
    }
  }

  // Obtener todos los posts ordenados por fecha
  getPosts(): Observable<ForumPost[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, orderBy('fecha', 'desc'));

    return collectionData(q, { idField: 'id' }).pipe(
      map((posts: any[]) => {
        console.log('Posts obtenidos:', posts.length);
        return posts.map(post => ({
          ...post,
          fecha: post.fecha?.toDate ? post.fecha.toDate() : new Date(post.fecha)
        }));
      })
    ) as Observable<ForumPost[]>;
  }
}
