import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicydetailsComponent } from './policydetails.component';

describe('PolicydetailsComponent', () => {
  let component: PolicydetailsComponent;
  let fixture: ComponentFixture<PolicydetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicydetailsComponent]
    });
    fixture = TestBed.createComponent(PolicydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
