import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IExpense } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  push(arg0: { key: string; title: string; description: string; price: string; }) {
    throw new Error('Method not implemented.');
  }
  private dbPath = '/expenses';
  expensesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { 
    this.expensesRef=db.list(this.dbPath);
  }

  getAllExpenses(userId: string){
    return this.expensesRef;
  }

  getExpense(key:string){
    return this.db.object('${this.dbPath}/${key}');
  }

  addExpense(userId: string, expense: IExpense) {
    return this.db.list(`${this.dbPath}/${userId}`).push(expense);
  }
  

  updateExpense(key:string,expense: IExpense){
   this.expensesRef.update(key, expense)
  }

  deleteExpense(key:string){
    return this.expensesRef.remove(key);
  }
}
