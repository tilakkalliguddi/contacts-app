import { Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'edit-contact/:id', component: ContactFormComponent },
            { path: 'contact-details/:id', component: ContactDetailsComponent },
            { path: 'contact-form', component: ContactFormComponent },
            { path: '', component: LandingPageComponent },
            { path: "**", component: LandingPageComponent },

        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: "**", component: HomeComponent }

];
