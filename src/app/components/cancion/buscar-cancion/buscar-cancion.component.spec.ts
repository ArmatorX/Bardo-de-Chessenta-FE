import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCancionComponent } from './buscar-cancion.component';

describe('BuscarCancionComponent', () => {
  let component: BuscarCancionComponent;
  let fixture: ComponentFixture<BuscarCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarCancionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
