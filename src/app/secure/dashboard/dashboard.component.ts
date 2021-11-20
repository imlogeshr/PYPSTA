import { Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role:any;
  projectData:any;
  userData:any;
  taskData:any;

  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;


  displayedColumns: string[] = ['id', 'name','edit'];
  displayedColumns1: string[] = ['id', 'project', 'name','assignedTo', 'status', 'edit'];

  constructor( public dialog: MatDialog) { }


  ngOnInit(): void {
this.dataLoad();
    if(this.role!='ADMIN'){
this.displayedColumns.pop()
    }





  }

  dataLoad(){
        this.role=localStorage.getItem('role');
    this.projectData=localStorage.getItem('projectData');
    this.taskData=localStorage.getItem('taskData');
    this.userData=localStorage.getItem('userData');
    this.userData=JSON.parse(this.userData)
    this.projectData=JSON.parse(this.projectData)
    this.taskData=JSON.parse(this.taskData)
        this.dataSource = new MatTableDataSource(this.projectData);
        this.dataSource1 = new MatTableDataSource(this.taskData);
  }

   addProject(){
     let data:any={};
    data.type='addProject'
    data.role=this.role;
    data.id=(this.projectData.length)+1;
    data.name=''
    this.dialog.open(EditComponent, { data: data, width: '25%', height:"auto" }).afterClosed().subscribe(() => { this.dataLoad(); } );
  }

  editProject(data:any){
    data.type='editProject'
    data.role=this.role;
    this.dialog.open(EditComponent, { data: data, width: '25%', height:"auto" }).afterClosed().subscribe(() => { this.dataLoad(); } );
  }

   editTask(data:any){
    data.type='editTask'
    data.role=this.role;
    this.dialog.open(EditComponent, { data: data, width: '25%', height:"auto" }).afterClosed().subscribe(() => { this.dataLoad(); } );
  }

   addTask(){
     let data:any={};
    data.type='addTask'
    data.role=this.role;
    data.id=(this.taskData.length)+1;
    data.name='';
    data.assignedTo='';
    data.status='';
    data.project='';
    this.dialog.open(EditComponent, { data: data, width: '25%', height:"auto" }).afterClosed().subscribe(() => { this.dataLoad(); } );
  }



}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class EditComponent implements OnInit {


projectData:any=localStorage.getItem('projectData');
userData:any=localStorage.getItem('userData');
taskData:any=localStorage.getItem('taskData');

elementData:any;
id: any="";
project:any="";
name: any="";
assignedTo: any="";
status: any="";
task:Boolean=false;
title:any="";
taskEdit:Boolean=false;
add:Boolean=false;

  constructor( public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
this.elementData=data;
    }

 ngOnInit() {
     this.projectData=JSON.parse(this.projectData)
    this.taskData=JSON.parse(this.taskData)
    this.userData=JSON.parse(this.userData)


     if(this.elementData.type=='addProject'){
      this.task=false;
      this.title='Add New Project'
      this.id=this.elementData.id;
      this.name=this.elementData.name;
      this.add=true;

    }

    if(this.elementData.type=='editProject'){
      this.task=false;
      this.title='Update Project Details'
      this.id=this.elementData.id;
      this.name=this.elementData.name;

    }

     if(this.elementData.type=='addTask'){
      this.task=true;
      this.add=true;
      this.title='Add New Task'
      this.id=this.elementData.id;
      this.name=this.elementData.name;
      this.assignedTo=this.elementData.assignedTo;
       this.project=this.elementData.project;
this.status=this.elementData.status;
    }

     if(this.elementData.type=='editTask'){
       if(this.elementData.role=='DEVELOPER'){
         this.taskEdit=true;
       }
      this.task=true;
      this.title='Update Task'
      this.id=this.elementData.id;
      this.name=this.elementData.name;
      this.assignedTo=this.elementData.assignedTo;
       this.project=this.elementData.project;
this.status=this.elementData.status;
    }
 }

 submit(){
   if(this.task==false){
     if(this.add==false){
this.projectData[this.id-1].id=this.id;
this.projectData[this.id-1].name=this.name;

     }else{
      this.projectData.push({"id":this.id, "name":this.name})
     }
     localStorage.setItem('projectData', JSON.stringify(this.projectData))
   }else{
     if(this.add==false){
     this.taskData[this.id-1].id=this.id;
     this.taskData[this.id-1].project=this.project;
this.taskData[this.id-1].name=this.name;
 this.taskData[this.id-1].assignedTo=this.assignedTo;
this.taskData[this.id-1].status=this.status;}
else{
  this.taskData.push({"id":this.id, "name":this.name, "assignedTo":this.assignedTo, "status":this.status,"project":this.project})
}
 localStorage.setItem('taskData', JSON.stringify(this.taskData))
   }


this.dialogRef.close();
 }

 closeDialog(): void {
    this.dialogRef.close();
  }


}

