import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductComponent } from './product.component';
import { ProductsService } from '../products/products.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockProductsService: any;
  let mockActivatedRoute: any;
  let router: Router;

  beforeEach(async () => {
    mockProductsService = {
      getProductById: jasmine.createSpy('getProductById').and.returnValue(
        of({
          id: '1',
          url: 'https://www.bmw.com.br/path/to/i7-image.jpg',
          name: 'BMW i7',
          description:
            'O primeiro BMW i7 totalmente elétrico. O BMW i7 xDrive60 M Sport combina o desempenho elétrico e o entretenimento multissensorial para oferecer uma experiência de dirigir inesquecível.',
          price: 1321950.0,
        })
      ),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ProductComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product on init', () => {
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockProductsService.getProductById).toHaveBeenCalledWith('1');
    expect(component.product).toBeTruthy();
    expect(component.product?.name).toEqual('BMW i7');
  });

  it('should navigate to quote page on requestQuote', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(router.navigate).toHaveBeenCalledWith(['/quote', '1']);
  });
});
