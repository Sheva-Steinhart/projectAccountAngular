import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DataSegmentationComponent } from './components/data-segmentation/data-segmentation.component';
import { CustomerReceiptsComponent } from './components/customer-receipts/customer-receipts.component';
import { Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterModule,
    CustomerReceiptsComponent,
    HomeComponent,
    NgIf,
    MatTabsModule,
    DataSegmentationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
  title = 'angular';
}
