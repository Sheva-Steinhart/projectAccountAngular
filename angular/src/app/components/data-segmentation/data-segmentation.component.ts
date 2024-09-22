import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-data-segmentation',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './data-segmentation.component.html',
  styleUrl: './data-segmentation.component.scss'
})
export class DataSegmentationComponent {
  readonly bestBoys: string[] = ['month', 'year', 'range', 'byCustomer'];
  selectedDog!:string;
 
  onDogSelected(dog:string){
     this.selectedDog=dog;
     console.log(this.selectedDog);
     
  }
}
