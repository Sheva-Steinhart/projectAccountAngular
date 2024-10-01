import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { CommonModule } from '@angular/common';
import { Customer} from '../../Modules/interface';

@Injectable({
  providedIn: 'root'
})

export class DataService {  

  private baseUrl='http://127.0.0.1:8080';
  constructor(private http: HttpClient) { }


  getAllItems() :Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseUrl}/customer/getAllCustomers`);
  }
}
