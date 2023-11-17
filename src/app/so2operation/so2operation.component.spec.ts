import { ComponentFixture, TestBed } from '@angular/core/testing';

import { So2operationComponent } from './so2operation.component';

describe('So2operationComponent', () => {
  let component: So2operationComponent;
  let fixture: ComponentFixture<So2operationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [So2operationComponent]
    });
    fixture = TestBed.createComponent(So2operationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
