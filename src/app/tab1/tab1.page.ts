import { Component, inject } from '@angular/core';
import { IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonCard } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { InterfaceBares } from '../models/interface-bares';
import { locateOutline, locationOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonCard, IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList],
})
export class Tab1Page {

  authService = inject(AuthService);

      logout() {
      this.authService.logout();
    }

bares: InterfaceBares[] = [
    {
      id: 1,
      nombre: 'Mad Crow Grill',
      valoracion: 4.5,
      direccion: 'Ctra. Comarcal, C-35, km 58,5, 08470, Barcelona',
      telefono: '692156886',
      descripcion: 'Un sitio ideal para ir a desayunar o a comer. Platos abundantes y exquisitos. El personal muy atento y la carta suficientemente extensa. La decoracion muy bien.',
      imagen: 'assets/madcrow.png',
      mapa: 'https://maps.app.goo.gl/PSjEntjPJzuzmStbA'
    },
    {
      id: 2,
      nombre: "L'abadia del pont vell",
      valoracion: 4.7,
      direccion: 'Camí de Sant Benet, nau 1, 08272 Sant Fruitós de Bages, Barcelona',
      telefono: '987654321',
      descripcion: 'Con una decoración super motera, sobretodo podemos destacar la atención de los camareros. La comida es excelente y abundante Recomendamos 100% la crema catalana.',
      imagen: 'assets/abadiaDelPontVell.png',
      mapa: 'https://maps.app.goo.gl/ZT6CQGLE9V3sWW4h7'
    },
    {
      id: 3,
      nombre: 'Barba Rossa beach bar',
      valoracion: 4.3,
      direccion: 'Pg. Marítim, 209, 08860 Castelldefels, Barcelona',
      telefono: '931248864',
      descripcion: 'Una decoración muy peculiar, aderezada con un personal agradable uniformado muy a la americana. Comida deliciosa, a destacar las burguers y un ambiento rockero, aunque muy familiar.',
      imagen: 'assets/barbarrossa.png',
      mapa: 'https://maps.app.goo.gl/jxqZs4xdo86Py1998'
    },
    {
      id: 4,
      nombre: 'La cantera biker bar',
      valoracion: 4.6,
      direccion: 'Avinguda Calafell, Km 2, 43719 Bellvei, Tarragona',
      telefono: '650462491',
      descripcion: 'Construido sobre una antigua Cantera de carbonato de calcio, su decoración combina el estilo de una casa del lejano Oeste, al más puro estilo Harley. Lugar idóneo para estar con la familia, pero también con la pareja o entre amigos. Concentraciones, quedadas, conciertos, fiestas temáticas, zona de barbacoas, aniversarios, comuniones, bodas, desayunos moteros, zona de acampada, fiestas privadas... 12.000m2 dan para mucho. ',
      imagen: 'assets/lacantera.png',
      mapa: 'https://maps.app.goo.gl/k2SUcf3SNqAdWnAh8'
    }
  ];

  constructor() {
    addIcons({ locationOutline})
  }

}
