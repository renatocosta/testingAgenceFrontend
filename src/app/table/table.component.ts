import { Component, OnInit, Input } from '@angular/core';
import { globals } from '../../environments/globals';
import { APIService } from  '../api.service';

export interface Transaction {
  period: string;
  toyota: string;
  traffic: string;
  unicoba: string;
  webmotors: string;
  tim: string;
  total:string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  showTableStatusSimple: boolean = false;
  showTableStatusDouble: boolean = false;  
  displayedColumns = ['period', 'toyota', 'traffic', 'unicoba', 'webmotors', 'tim', 'total'];
  transactions: Transaction[] = [
    {period: 'Janeiro de 2007', toyota: '1.500,00', traffic: '1.500,00', unicoba: '11.350,00', webmotors: '1.500,00', tim: '1.350,00', total: '12.800,00' },
    {period: 'Janeiro de 2007', toyota: '1.500,00', traffic: '1.500,00', unicoba: '11.350,00', webmotors: '1.500,00', tim: '1.350,00', total: '17.200,00'}
  ];

  constructor(public global:globals, private  apiService:  APIService) {
  }

  @Input('filterLabel')
  set _filterLabel(data: string) {

    console.log("LB: ");

     if(data == this.global.labelsTarget[0]) {
       console.log("L1");
       this.showTableStatusSimple = true; 
       this.showTableStatusDouble = false; 
       this.getPosts();
      } else if(data == this.global.labelsTarget[1]) {
        console.log("L2");        
        this.showTableStatusSimple = false; 
        this.showTableStatusDouble = true; 
        this.getComments(); 
      }    

  }
  
  ngOnInit() {

  }

  public getPosts(){
    this.apiService.getPosts().subscribe((data:  Array<object>) => {
        console.log(data);
    });
  }

  public getComments(){
    this.apiService.getComments().subscribe((data:  Array<object>) => {
        console.log(data);
    });
  }

 /** Gets the total cost of all transactions. */
 getTotal() {
  return this.transactions.map(t => parseInt(t.total)).reduce((acc, value) => acc + value, 0);
}

}
