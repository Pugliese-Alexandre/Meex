import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationComponent } from './facturation.component';

describe('FacturationComponent', () => {
  let component: FacturationComponent;
  let fixture: ComponentFixture<FacturationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
