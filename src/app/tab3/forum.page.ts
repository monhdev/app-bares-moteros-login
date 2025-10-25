// forum.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForumService, UserData, ForumPost } from '../services/forum.service';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ForumPage implements OnInit {
  currentUser$: Observable<UserData | null>;
  posts$: Observable<ForumPost[]>;
  newPostText: string = '';
  isSubmitting: boolean = false;

  constructor(private forumService: ForumService,
    private auth: Auth)
    {
    this.currentUser$ = this.forumService.getCurrentUserData();
    this.posts$ = this.forumService.getPosts();
  }

  ngOnInit() {
    // Verificar usuario autenticado
  this.auth.onAuthStateChanged(user => {
    if (user) {
      console.log('✅ Usuario autenticado:', user.uid);
      console.log('Email:', user.email);
    } else {
      console.log('❌ No hay usuario autenticado');
    }
  });
  }

  async submitPost() {
    if (!this.newPostText.trim()) {
      console.log('Texto vacío');
      return;
    }

    console.log('Intentando publicar:', this.newPostText);
    this.isSubmitting = true;

    try {
      await this.forumService.createPost(this.newPostText);
      this.newPostText = '';
      console.log('✅ Post creado exitosamente');
    } catch (error) {
      console.error('❌ Error al crear post:', error);
      alert('Error al publicar: ' + (error as any).message);
    } finally {
      this.isSubmitting = false;
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  }
}
