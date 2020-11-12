import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCancionComponent } from './agregar-cancion.component';

describe('AgregarCancionComponent', () => {
  let component: AgregarCancionComponent;
  let fixture: ComponentFixture<AgregarCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCancionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
