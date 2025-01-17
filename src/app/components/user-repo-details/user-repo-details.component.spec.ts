import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { UserRepoDetailsComponent } from './user-repo-details.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

describe('UserRepoDetailsComponent', () => {
  let component: UserRepoDetailsComponent;
  let fixture: ComponentFixture<UserRepoDetailsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getUser',
      'getRepoDetails',
    ]);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', [
      'show',
      'hide',
      'getSpinner',
    ]);
    TestBed.configureTestingModule({
      declarations: [UserRepoDetailsComponent],
      imports: [NgxSpinnerModule],
      providers: [
        NgxSpinnerService,
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    });
    fixture = TestBed.createComponent(UserRepoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset page to 1', () => {
    component.currentPage = 3;
    component.resetPage();
    expect(component.currentPage).toEqual(1);
  });
});
