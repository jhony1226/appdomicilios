import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDomiciliarioComponent } from './modal-domiciliario.component';

describe('ModalDomiciliarioComponent', () => {
  let component: ModalDomiciliarioComponent;
  let fixture: ComponentFixture<ModalDomiciliarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDomiciliarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDomiciliarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
