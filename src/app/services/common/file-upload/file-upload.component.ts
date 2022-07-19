import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOption>

  constructor(private httpClientService: HttpClientService, private alertifyService:AlertifyService) { }

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (var file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      });
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString:this.options.queryString,
      headers:new HttpHeaders({"responseType":"blob"})
    }, fileData).subscribe(data=>{
      if (this.options.isAdminPage) {
        this.alertifyService.message("Files uploaded by successfully",{
          dismissOthers:true,
          messageType:MessageType.Success,
          position:Position.TopRight
        })
      }else{}

    },(errorResponse:HttpErrorResponse)=>{
      if (this.options.isAdminPage) {
        this.alertifyService.message("Occurred unexpected error",{
          dismissOthers:true,
          messageType:MessageType.Error,
          position:Position.TopRight
        })
      }else{}
    })

  }

}


export class FileUploadOption {
  controller?: string
  action?: string
  queryString?: string
  explanation?: string
  accept?: string
  isAdminPage:boolean=true
}
