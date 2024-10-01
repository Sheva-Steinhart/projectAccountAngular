import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../Services/services/data.service';
import { Customer } from '../../Modules/interface';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-data-segmentation',
  standalone: true,
  imports: [MatChipsModule,
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './data-segmentation.component.html',
  styleUrl: './data-segmentation.component.scss'
})
export class DataSegmentationComponent {

  myForm: FormGroup;
  readonly bestBoys: string[] = ['month', 'year', 'range', 'byCustomer'];
  selectedDog!: string;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  allcustomer = new Array<Customer>();
  displayedColumns: string[] = ['position', 'name', 'weight'];
  
  constructor(private dataService:DataService) {
    this.myForm = new FormGroup({
      customerName: new FormControl('', [Validators.required]),
    })
    this.dataService.getAllItems().subscribe(data => {
console.log({data});
    })
  }
  onDogSelected(dog: string) {
    this.selectedDog = dog;
    console.log(this.selectedDog);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

