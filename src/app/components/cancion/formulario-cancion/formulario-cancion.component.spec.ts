import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCancionComponent } from './formulario-cancion.component';

describe('FormularioCancionComponent', () => {
  let component: FormularioCancionComponent;
  let fixture: ComponentFixture<FormularioCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCancionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
