import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCancionComponent } from './consultar-cancion.component';

describe('ConsultarCancionComponent', () => {
  let component: ConsultarCancionComponent;
  let fixture: ComponentFixture<ConsultarCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarCancionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
