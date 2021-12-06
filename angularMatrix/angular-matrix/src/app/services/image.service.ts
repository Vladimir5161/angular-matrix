import { Injectable } from '@angular/core';

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
    function getFile(file: Blob) {
      return new Promise((resolve: (value: any) => void, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(file);
        reader.onerror = error => reject(error);
      });
    }

    getFile($event.target.files[0]).then(value => {
        this.imageSrc = value
    })
  }
}
