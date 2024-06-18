import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteComponent } from './quote.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../products/products.service';
import { QuoteService } from './quote.service';
import { CookieService } from 'ngx-cookie-service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { Person } from '../../model/person.model';
import { By } from '@angular/platform-browser';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;
  let productServiceMock: any;
  let quoteServiceMock: any;
  let cookieServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductsService', [
      'getProductById',
    ]);
    quoteServiceMock = jasmine.createSpyObj('QuoteService', [
      'getPersonByMail',
      'sendQuote',
    ]);
    cookieServiceMock = jasmine.createSpyObj('CookieService', [
      'check',
      'get',
      'set',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        QuoteComponent, // Importing standalone component
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      providers: [
        { provide: ProductsService, useValue: productServiceMock },
        { provide: QuoteService, useValue: quoteServiceMock },
        { provide: CookieService, useValue: cookieServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show additional fields when email is verified', () => {
    const personResponse: Person = {
      id: 1,
      name: 'Maria Clara',
      mail: 'mail@gmail.com',
      cellphone: '123454567890',
    };
    quoteServiceMock.getPersonByMail.and.returnValue(of(personResponse));

    component.verifyEmail('test@example.com');

    expect(quoteServiceMock.getPersonByMail).toHaveBeenCalledWith(
      'test@example.com'
    );
    expect(component.person).toEqual(personResponse);
    expect(component.showAdditionalFields).toBeTruthy();
  });

  it('should navigate to account page after successful quote submission', () => {
    const navigateSpy = spyOn(router, 'navigate');
    quoteServiceMock.sendQuote.and.returnValue(of({}));

    component.sendQuote();

    expect(quoteServiceMock.sendQuote).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/account']);
  });
});
