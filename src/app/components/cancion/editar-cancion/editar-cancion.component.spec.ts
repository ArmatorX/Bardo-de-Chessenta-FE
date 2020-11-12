import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCancionComponent } from './editar-cancion.component';

describe('EditarCancionComponent', () => {
  let component: EditarCancionComponent;
  let fixture: ComponentFixture<EditarCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCancionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
