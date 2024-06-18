import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { QuoteService } from '../quote/quote.service';
import { of } from 'rxjs';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockQuoteService: any;

  beforeEach(async () => {
    mockQuoteService = {
      getQuotesByMail: jasmine
        .createSpy('getQuotesByMail')
        .withArgs('mail@gmail.com')
        .and.returnValue(
          of([
            {
              id: 4,
              person: {
                id: 1,
                name: 'Maria Clara',
                mail: 'mail@gmail.com',
                cellphone: '123454567890',
              },
              product: {
                id: 3,
                url: 'https://www.bmw.com.br/path/to/i7-image.jpg',
                name: 'BMW i7',
                description:
                  'O primeiro BMW i7 totalmente elétrico. O BMW i7 xDrive60 M Sport combina o desempenho elétrico e o entretenimento multissensorial para oferecer uma experiência de dirigir inesquecível.',
                price: 1321950.0,
                type: 'Eletrico',
              },
            },
          ])
        )
        .withArgs('maaail@gmail.com')
        .and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [
        AccountComponent,
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      providers: [
        CookieService,
        { provide: QuoteService, useValue: mockQuoteService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle quote retrieval for a specific mail', () => {
    component.getQuote('mail@gmail.com');
    expect(mockQuoteService.getQuotesByMail).toHaveBeenCalledWith(
      'mail@gmail.com'
    );
    expect(component.quotes.length).toBeGreaterThan(0);
  });

  it('should show error if no quotes are found', () => {
    component.getQuote('maaail@gmail.com');
    expect(component.showQuotes).toBeFalse();
    expect(component.showError).toBeTrue();
  });
});
