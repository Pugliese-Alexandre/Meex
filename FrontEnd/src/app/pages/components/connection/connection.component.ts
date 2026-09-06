import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
@Component({
  selector: 'app-connection',
  standalone: true,
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, ]
})
export class ConnectionComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]]
    });


  }

  onSubmit() {
    if (this.form.valid) {
      const { email, motDePasse } = this.form.value;

      this.authService.login(email, motDePasse).subscribe({
        next: (response) => {
          const fakeToken = btoa(`${email}:${motDePasse}`);
          this.authService.setLogin(fakeToken, response.email, response.id);
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.error(err);
          alert('Échec de la connexion ❌');
        }
      });
    }
  }

}
