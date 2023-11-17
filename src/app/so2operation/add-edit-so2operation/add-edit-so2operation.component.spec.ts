import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSo2operationComponent } from './add-edit-so2operation.component';

describe('AddEditSo2operationComponent', () => {
  let component: AddEditSo2operationComponent;
  let fixture: ComponentFixture<AddEditSo2operationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSo2operationComponent]
    });
    fixture = TestBed.createComponent(AddEditSo2operationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
