import { Component } from '@angular/core';
import { HeaderComponent } from '../../commons/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../commons/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
