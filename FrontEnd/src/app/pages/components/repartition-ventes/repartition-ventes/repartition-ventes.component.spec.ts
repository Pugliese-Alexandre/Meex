import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionVentesComponent } from './repartition-ventes.component';

describe('RepartitionVentesComponent', () => {
  let component: RepartitionVentesComponent;
  let fixture: ComponentFixture<RepartitionVentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartitionVentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepartitionVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
