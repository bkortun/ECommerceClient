import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }


  openDialog(dialogParamaters:Partial<DialogParamaters>): void {
    const dialogRef = this.dialog.open(dialogParamaters.componentType, {
      width: dialogParamaters.options?.width,
      height:dialogParamaters.options?.height,
      position:dialogParamaters.options?.position,
      data: dialogParamaters.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParamaters.data) {
        dialogParamaters.afterClosed();
      }
    });
  }
}

export class DialogParamaters{
  componentType:ComponentType<any>;
  data:any;
  afterClosed:()=>void;
  options?:Partial<DialogOptions>
}

export class DialogOptions{
  width?:string="250px";
  height?:string;
  position?:DialogPosition;
}
