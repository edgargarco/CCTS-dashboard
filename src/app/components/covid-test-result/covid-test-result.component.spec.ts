import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestResultComponent } from './covid-test-result.component';

describe('CovidTestResultComponent', () => {
  let component: CovidTestResultComponent;
  let fixture: ComponentFixture<CovidTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
