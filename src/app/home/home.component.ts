import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, ContactListComponent, ContactDetailsComponent, LandingPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
