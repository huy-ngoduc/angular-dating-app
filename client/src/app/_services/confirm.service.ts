import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../modal/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  bsModalRef: BsModalRef = {} as BsModalRef;

  constructor(private modalService: BsModalService) { }

  confirm(title='Confirmation', message="Are you sure want to do this?", btnOkText="Ok", btnCancelText="Cancel"): Observable<boolean>{    
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText
      }
    }

    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);
    return new Observable<boolean>(this.getResult());
  }

  private getResult(){
    return (observer: any) => {
      const subscription = this.bsModalRef.onHidden.subscribe(() => {
        observer.next(this.bsModalRef.content?.result);
        observer.comlete();
      });

      return {
        unsubscribe(){
          subscription.unsubscribe();
        }
      }
    }
  }
}
