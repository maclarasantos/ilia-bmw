import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let router: Router;

  beforeEach(async () => {
    // Create a mock for ProductsService
    mockProductsService = jasmine.createSpyObj('ProductsService', [
      'getProducts',
    ]);

    // Set up the testing environment for the component
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        ProductsComponent, // Importing standalone component
      ],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compileComponents();

    // Create a fixture for the component
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Mock data returned by the service
    mockProductsService.getProducts.and.returnValue(
      of([
        {
          id: 1,
          url: 'https://www.bmw.com.br/content/dam/bmw/common/all-models/1-series/5-door/2022/highlights/bmw-1-series-gallery-image-design-01_890.jpg/jcr:content/renditions/cq5dam.resized.img.890.medium.time1632213545861.jpg',
          name: 'BMW Série 1',
          description:
            'O BMW Série 1 chegou para atrair todos os olhares. Seu design extraordinário o distingue de todos os outros, imediatamente ao primeiro olhar. ',
          price: 320950.0,
          type: 'Eletrico',
        },
        {
          id: 2,
          url: 'https://www.bmw.com.br/content/dam/bmw/common/all-models/2-series/gran-coupe/2022/Highlights/bmw-2-series-gran-coupe-gallery-image-design-01_890.jpg/jcr:content/renditions/cq5dam.resized.img.890.medium.time1632927779852.jpg',
          name: 'BMW Série 2 Gran Coupé',
          description:
            'O BMW Série 2 Gran Coupé introduz uma nova forma de autoridade, apresentando um caráter ousado em sua classe de veículos compactos.',
          price: 320950.0,
          type: 'Gasolina',
        },
      ])
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    fixture.detectChanges();
    expect(component.products.length).toBe(2);
  });

  it('should navigate to product detail page', () => {
    fixture.detectChanges();
    const spy = spyOn(router, 'navigate');
    const link = fixture.debugElement.queryAll(By.css('.card-link'))[0];
    link.triggerEventHandler('click', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalledWith(['/product', 1]);
  });
});
