import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordDialog } from './dialog-password-dialog'

describe('DialogPasswordDialog', () => {
  let component: DialogPasswordDialog;
  let fixture: ComponentFixture<DialogPasswordDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogPasswordDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
