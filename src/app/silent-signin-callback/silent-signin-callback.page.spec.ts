import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilentSigninCallbackPage } from './silent-signin-callback.page';

describe('SilentSigninCallbackPage', () => {
  let component: SilentSigninCallbackPage;
  let fixture: ComponentFixture<SilentSigninCallbackPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SilentSigninCallbackPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SilentSigninCallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
