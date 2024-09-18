import { Routes } from '@angular/router';
import { CustomerReceiptsComponent } from './components/customer-receipts/customer-receipts.component';
import { DataSegmentationComponent } from './components/data-segmentation/data-segmentation.component';
import { HomeComponent } from './components/home/home.component';
export const routes: Routes = [
    { path: 'customerReceipts', component: CustomerReceiptsComponent },
    { path: 'dtaSegmentation', component: DataSegmentationComponent },
    {path:'',component:HomeComponent}

];
