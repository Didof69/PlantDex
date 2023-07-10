import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyPlantsComponent } from './page-my-plants.component';

describe('PageMyPlantsComponent', () => {
  let component: PageMyPlantsComponent;
  let fixture: ComponentFixture<PageMyPlantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageMyPlantsComponent]
    });
    fixture = TestBed.createComponent(PageMyPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
