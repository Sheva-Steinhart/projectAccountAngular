import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Customer } from '../../Models/Customer.model';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-customer-receipts',
  standalone: true,
  providers: [provideNativeDateAdapter()],

  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule
  ],  templateUrl: './customer-receipts.component.html',
  styleUrl: './customer-receipts.component.scss'
})

export class CustomerReceiptsComponent {
  myControl = new FormControl<string | Customer>('');
  options: Customer[] = [{customerId:1,customerName: 'Mary'}, {customerId:2,customerName: 'tamer'},{customerId:3,customerName: 'khjg'},];

  filteredOptions!:Observable<Customer[]>
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.customerName;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  
  displayFn(user: Customer): string {
    return user && user.customerName ? user.customerName : '';
  }
  private _filter(name: string): Customer[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.customerName.toLowerCase().includes(filterValue));
  }

}
