import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSegmentationComponent } from './data-segmentation.component';

describe('DataSegmentationComponent', () => {
  let component: DataSegmentationComponent;
  let fixture: ComponentFixture<DataSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSegmentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
