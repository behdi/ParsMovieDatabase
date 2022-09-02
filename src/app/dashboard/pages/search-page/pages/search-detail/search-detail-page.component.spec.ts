import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDetailPageComponent } from './search-detail-page.component';

describe('SearchDetailComponent', () => {
  let component: SearchDetailPageComponent;
  let fixture: ComponentFixture<SearchDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
