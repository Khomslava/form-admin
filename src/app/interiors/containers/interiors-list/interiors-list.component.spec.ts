import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorsListComponent } from './interiors-list.component';

describe('InteriorsListComponent', () => {
  let component: InteriorsListComponent;
  let fixture: ComponentFixture<InteriorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteriorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteriorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
