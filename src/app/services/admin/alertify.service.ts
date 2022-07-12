import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: String, options:Partial<AlertifyOptions>) {//Partial parametreyi javascript objesi şeklinde verebilmemizi sağlıyor {}
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const alert = alertify[options.messageType](message);
    if (options.dismissOthers)
      alert.dismissOthers();
  }

  dismissAll() {
    alertify.dismissAll();
  }

}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomLeft;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = "error",
  Success = "success",
  Message = "message",
  Notify = "notify",
  Warning = "warning"
}

export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}
