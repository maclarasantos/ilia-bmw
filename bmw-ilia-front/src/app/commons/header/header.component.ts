import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private cookieService: CookieService) {}
  mail: string = '';
  showLogout: boolean = false;

  ngOnInit(): void {
    if (this.cookieService.check('userEmail')) {
      this.mail = this.cookieService.get('userEmail');
      this.showLogout = true;
    }
  }

  goToHome(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/');
  }

  viewProducts(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/products');
  }

  myAccount(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/account');
  }

  logout() {
    this.cookieService.delete('userEmail');
    window.location.reload();
  }
}
