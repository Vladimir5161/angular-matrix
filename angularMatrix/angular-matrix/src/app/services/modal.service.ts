import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Alert} from "../types/alert.types";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal = new BehaviorSubject<{visible: boolean, postId: string}>({
    visible: false,
    postId:   ''
  });

  setModal(state: {visible: boolean, postId: string}) {
    this.modal.next(state);
  }
  getModal(): Subject<{visible: boolean, postId: string}> {
    return this.modal;
  }
  constructor() { }
  openModal(postId: string) {
    this.setModal({postId: postId, visible: true})
  }
  closeModal() {
    this.setModal({postId: '', visible: false})
  }

}
