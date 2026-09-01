import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-custom-button',
  standalone: true,
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  imports: [CommonModule, HttpClientModule]
})
export class CustomButtonComponent {
  @Input() icon: string = '';        // icône (class PrimeIcons ou Unicode)
  @Input() tooltip: string = '';     // texte au survol
  @Input() styleClass: string = '';  // style CSS
  @Input() type: 'button' | 'submit' = 'button';
}
