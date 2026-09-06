// Import de base d'Angular
import { Component } from '@angular/core';

// Outils de création et validation de formulaire réactif
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Service d'authentification personnalisé
import { AuthService } from '../../../services/auth.service';

// Service Angular pour la navigation entre pages
import { Router } from '@angular/router';

// Modules nécessaires pour ce composant standalone
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Bouton personnalisé utilisé dans le formulaire
import { ButtonComponent } from '../../../../shared/components/button/button.component';

// Déclaration du composant
@Component({
  selector: 'app-inscription',
  standalone: true,
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent]
})
export class InscriptionComponent {
  // Déclaration du formulaire réactif
  form: FormGroup;

  // Injection des services nécessaires : formulaire, authentification, navigation
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validation
    this.form = this.fb.group({
      nom: ['', Validators.required],                                  // champ requis
      email: ['', [Validators.required, Validators.email]],            // champ requis + format email
      motDePasse: ['', Validators.required]                            // champ requis
    });
  }

  // Soumission du formulaire
  onSubmit() {
    // Vérifie que le formulaire est valide avant envoi
    if (this.form.valid) {
      // Appelle le service d'inscription avec les données du formulaire
      this.authService.register(this.form.value).subscribe({
        next: () => {
          // En cas de succès : message et redirection vers la page de connexion
          alert('Inscription réussie ✅');
          this.router.navigate(['/connection']);
        },
        error: err => {
          // En cas d'erreur : message et affichage en console
          alert('Erreur : ' + err.error.message || 'Inscription échouée');
          console.error(err);
        }
      });
    }
  }
}
