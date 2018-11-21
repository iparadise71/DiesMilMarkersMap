import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinitListScrollComponent } from './infinit-list-scroll.component';

describe('InfinitListScrollComponent', () => {
  let component: InfinitListScrollComponent;
  let fixture: ComponentFixture<InfinitListScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinitListScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinitListScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
