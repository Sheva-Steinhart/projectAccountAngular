import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DataSegmentationComponent } from './components/data-segmentation/data-segmentation.component';
import { CustomerReceiptsComponent } from './components/customer-receipts/customer-receipts.component';
import { Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
//היה לי שגיאת core בגלל שורה זו 
//import { BrowserModule } from '@angular/platform-browser';
//אז הייתי צריכה להחליף אותה לשורה זו:
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from './Services/services/data.service';
@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    DataSegmentationComponent,
    CustomerReceiptsComponent,
    HomeComponent,
    NgIf,
    MatTabsModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
  title = 'angular';
}
