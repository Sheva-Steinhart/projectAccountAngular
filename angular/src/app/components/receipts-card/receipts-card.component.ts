import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Customer } from '../../Models/Customer.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-receipts-card',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './receipts-card.component.html',
  styleUrl: './receipts-card.component.scss'
})
export class ReceiptsCardComponent {
  @Input() name!: string;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data.name); // Access the passed data here
  }
  saveData() {

  }
}
