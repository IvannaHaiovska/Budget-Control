import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserDialogComponent } from './dialog-edit-user-dialog.component';

describe('DialogEditUserDialogComponent', () => {
  let component: DialogEditUserDialogComponent;
  let fixture: ComponentFixture<DialogEditUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
