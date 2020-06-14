import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationNodesComponent } from './location-nodes.component';

describe('LocationNodesComponent', () => {
  let component: LocationNodesComponent;
  let fixture: ComponentFixture<LocationNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
