import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapingComponent } from './maping.component';

describe('MapingComponent', () => {
  let component: MapingComponent;
  let fixture: ComponentFixture<MapingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
