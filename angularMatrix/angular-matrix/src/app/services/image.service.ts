import { Injectable } from '@angular/core';
import {defaultImage} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageSrc: any
  postId: string = ''
  constructor() {
  }
  clearImage() {
    this.imageSrc = ''
    this.postId = ''
  }
  onFileChange($event: any, postId?: string) {
    if(postId) {
      this.postId = postId
    }
    new Promise((resolve: (value: any) => void, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL($event.target.files[0]);
        reader.onload = () => resolve($event.target.files[0]);
        reader.onerror = error => reject(error);
      }).then(value => {
        this.imageSrc = value
    })
  }
  errorImage(event: any) {
    const img = event.target
    img.src = defaultImage
  }
}
