import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, subscribeOn } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { ReceiptsCardComponent } from '../receipts-card/receipts-card.component'
import { CommonModule } from '@angular/common';
import { DataService } from '../../Services/services/data.service';
import { Customer } from '../../Modules/interface';
@Component({
  selector: 'app-customer-receipts',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatButtonModule, MatDialogModule
  ], templateUrl: './customer-receipts.component.html',
  styleUrl: './customer-receipts.component.scss'
})

export class CustomerReceiptsComponent {
  myControl = new FormControl<string | Customer>('');
  optionsCustomer: Customer[] = [];
  filteredOptions!: Observable<Customer[]>
  constructor(private dataService: DataService) {
    this.dataService.getAllItems().subscribe(data => {
      this.optionsCustomer = data;
    })
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.optionsCustomer.slice();
      }),
    );
  }
  readonly dialog = inject(MatDialog);

  openDialog() {
    console.log(this.myControl.value);

    const dialogRef = this.dialog.open(ReceiptsCardComponent, {
      data: {
        name: this.myControl.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayFn(user: Customer): string {
    return user && user.name ? user.name : '';
  }
  private _filter(name: string): Customer[] {
    const filterValue = name.toLowerCase();

    return this.optionsCustomer.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
