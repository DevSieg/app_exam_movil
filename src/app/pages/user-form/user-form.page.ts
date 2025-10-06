import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, closeOutline } from 'ionicons/icons';
import { AuthService, User } from '../../services/auth';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon
  ]
})
export class UserFormPage implements OnInit {
  userId: number | null = null;
  isEditMode: boolean = false;
  
  user: Partial<User> = {
    email: '',
    password: '',
    role: 'Usuario'
  };

  roles: string[] = ['Administrador', 'Usuario', 'Supervisor'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    addIcons({ saveOutline, closeOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = parseInt(id, 10);
      this.isEditMode = true;
      this.loadUser();
    }
  }

  loadUser() {
    if (this.userId) {
    }
  }

  async saveUser() {
    if (!this.validateForm()) {
      await this.showAlert('Error', 'Por favor complete todos los campos requeridos');
      return;
    }

    try {
      if (this.isEditMode && this.userId) {
        // Actualizar usuario
        const updateData: Partial<User> = {
          email: this.user.email,
          role: this.user.role
        };
        
        // Solo actualizar contraseña si se ingresó una nueva
        if (this.user.password && this.user.password.trim() !== '') {
          updateData.password = this.user.password;
        }
          await this.showAlert('Éxito', 'Usuario actualizado correctamente');
      } else {
        // Crear nuevo usuario
        await this.showAlert('Éxito', 'Usuario creado correctamente');
      }
      
      this.router.navigate(['/users']);
    } catch (error) {
      await this.showAlert('Error', 'Ocurrió un error al guardar el usuario');
    }
  }

  validateForm(): boolean {
    if (!this.user.email || this.user.email.trim() === '') {
      return false;
    }
    if (!this.isEditMode && (!this.user.password || this.user.password.trim() === '')) {
      return false;
    }
    if (!this.user.role) {
      return false;
    }
    return true;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}