// import { Item } from './../../../../node_modules/@firebase/analytics-types/index.d';
// import { ExpenseService } from './../../core/services/expense.service';
// import { CommonModule } from '@angular/common';
// import { Component, IterableDiffers, OnInit } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { IExpense } from '../../core/models/common.model';
// import { Title } from '@angular/platform-browser';

// @Component({
//   selector: 'app-expense',
//   standalone: true,
//   imports: [CommonModule,RouterModule],
//   templateUrl: './expense.component.html',
//   styleUrl: './expense.component.scss'
// })
// export class ExpenseComponent implements OnInit {
//   expenses: IExpense[] = []; 
//   totalExpenses=0
//   constructor(private expenseService: ExpenseService, private router: Router ){}
  
//   ngOnInit(): void {
//     this.getAllExpenses();
//   }


//   getAllExpenses(){
//     this.expenseService.getAllExpenses().snapshotChanges().subscribe({
//       next:(data)=>{
//         this.expenses=[];

//         data.forEach ((Item)=>{
//           let expense = Item.payload.toJSON() as IExpense;
//           this.totalExpenses += parseInt(expense.price);

//           this.expenses.push({
//             key:Item.key || '',
//             title: expense.title,
//             description: expense.description,
//             price: expense.price,
//           })
//         })
//       }
//     })
//   }

//   editExpense(key:string){
//     this.router.navigate(['/expense-form/'+ key])
//   }

// }
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IExpense } from '../../core/models/common.model';
import { ExpenseService } from '../../core/services/expense.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  expenses: IExpense[] = []; 
  totalExpenses = 0;

  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses() {
    const userId = getAuth().currentUser?.uid; // Get the current user's ID

    if (userId) {
      this.expenseService.getAllExpenses(userId).snapshotChanges().subscribe({
        next: (data) => {
          this.expenses = [];
          this.totalExpenses = 0; // Reset total before calculation

          data.forEach((item) => {
            let expense = item.payload.toJSON() as IExpense;
            this.totalExpenses += parseInt(expense.price, 10); // Ensure base 10 parsing

            this.expenses.push({
              key: item.key || '',
              title: expense.title,
              description: expense.description,
              price: expense.price,
            });
          });
        },
        error: (error) => {
          console.error('Error fetching expenses:', error);
        }
      });
    } else {
      console.error('User is not authenticated');
    }
  }

  editExpense(key: string) {
    this.router.navigate(['/expense-form/' + key]);
  }
}
