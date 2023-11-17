import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSo2operationComponent } from './show-so2operation.component';

describe('ShowSo2operationComponent', () => {
  let component: ShowSo2operationComponent;
  let fixture: ComponentFixture<ShowSo2operationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSo2operationComponent]
    });
    fixture = TestBed.createComponent(ShowSo2operationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
