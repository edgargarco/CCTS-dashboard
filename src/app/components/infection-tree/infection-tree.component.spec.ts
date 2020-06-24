import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionTreeComponent } from './infection-tree.component';

describe('InfectionTreeComponent', () => {
  let component: InfectionTreeComponent;
  let fixture: ComponentFixture<InfectionTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectionTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
