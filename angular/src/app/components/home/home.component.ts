import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DataSegmentationComponent } from '../data-segmentation/data-segmentation.component';
import { CustomerReceiptsComponent } from '../customer-receipts/customer-receipts.component';
@Component({
  selector: 'app-home',
  standalone:true,
  imports: [MatTabsModule,
    DataSegmentationComponent,
    CustomerReceiptsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  flag:boolean=true;
  
}
