// Import des outils de test Angular
import { TestBed } from '@angular/core/testing';

// Import du service à tester
import { AuthService } from './auth.service';

// Bloc de test pour AuthService
describe('AuthService', () => {
  let service: AuthService;

  // Avant chaque test, configure un module de test et injecte le service
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configuration minimale
    service = TestBed.inject(AuthService); // Injection du service à tester
  });

  // Test de base : vérifie que le service est bien créé
  it('should be created', () => {
    expect(service).toBeTruthy(); // Assertion : le service doit exister
  });
});
