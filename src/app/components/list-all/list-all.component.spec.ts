import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllComponent } from './list-all.component';

describe('ListAllComponent', () => {
  let component: ListAllComponent;
  let fixture: ComponentFixture<ListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
