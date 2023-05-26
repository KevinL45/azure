<<<<<<< HEAD:angular/projects/azure_project_front_api/src/app/features/image/images-list/images-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesListComponent } from './images-list.component';

describe('ImagesListComponent', () => {
  let component: ImagesListComponent;
  let fixture: ComponentFixture<ImagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ImagesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSearchComponent } from './image-search.component';

describe('ImageSearchComponent', () => {
  let component: ImageSearchComponent;
  let fixture: ComponentFixture<ImageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> test_angular:angular/image-search/src/app/components/image-search/image-search.component.spec.ts
