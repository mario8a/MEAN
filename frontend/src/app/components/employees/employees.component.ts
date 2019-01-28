import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';


declare var M: any;


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm) {
    if(form.value._id){
      this.employeeService.putEmployee(form.value)
          .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Empleado actualizado'});
          this.getEmployees();
          });
    }else{
      this.employeeService.postEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Empleado guardado'});
        this.getEmployees();
      });
    }
  }

  getEmployees(){
    this.employeeService.getEmployee()
        .subscribe(res => {
          this.employeeService.employees = res as Employee[];
          console.log(res);
        });
  }

  deleteEmployee(_id: string){

    if(confirm('Estas seguro de eliminarlo?')){

      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmployees();
          M.toast({html: 'Ha sido eliminado correctamente'});
        });

    }
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

}
