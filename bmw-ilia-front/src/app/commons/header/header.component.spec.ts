import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let cookieService: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HeaderComponent],
      providers: [
        {
          provide: CookieService,
          useValue: jasmine.createSpyObj('CookieService', [
            'check',
            'get',
            'delete',
          ]),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to products', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const link = fixture.debugElement.query(By.css('.nav-link.products'));
    expect(link).toBeTruthy();
    link.triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(navSpy).toHaveBeenCalledWith('/products');
  });

  it('should navigate to account', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const link = fixture.debugElement.query(By.css('.nav-link.account'));
    expect(link).toBeTruthy();
    link.triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(navSpy).toHaveBeenCalledWith('/account');
  });

  it('should check cookies on init', () => {
    (cookieService.check as jasmine.Spy).and.returnValue(true);
    (cookieService.get as jasmine.Spy).and.returnValue('test@mail.com');
    component.ngOnInit();
    expect(component.mail).toEqual('test@mail.com');
    expect(component.showLogout).toBeTrue();
  });
});
