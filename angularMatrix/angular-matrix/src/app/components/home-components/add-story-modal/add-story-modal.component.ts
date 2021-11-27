import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-story-modal',
  templateUrl: './add-story-modal.component.html',
  styleUrls: ['./add-story-modal.component.scss']
})
export class AddStoryModalComponent implements OnInit {
  @Output()
  closeModalFunc = new EventEmitter<boolean>();
  imageSrc: string = '';
  storyGroup = this.fb.group({
    title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    content: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
  });
  errorMsg: string = ''
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  get storyGroupControls() {
    return this.storyGroup.controls;
  }
  onFileChange($event: any) {
    const reader = new FileReader();

    if($event.target.files && $event.target.files.length) {
      const [file] = $event.target.files;
      reader.readAsDataURL(file);

      reader.onloadend = () => {

        this.imageSrc = reader.result as string;

      };
    }
  }
  getErrorMessage() {
    if(this.storyGroupControls.title && !this.storyGroupControls.title.touched && this.storyGroupControls.title.errors?.minlength) {
      this.errorMsg = 'title length should be not less then 3'
    } else if(this.storyGroupControls.title.touched && !this.storyGroupControls.title) {
      this.errorMsg = 'title is required'
    } else if(this.storyGroupControls.content.touched && !this.storyGroupControls.content) {
      this.errorMsg = 'content is required'
    } else if(this.storyGroupControls.content && !this.storyGroupControls.content.touched && this.storyGroupControls.content.errors?.minlength) {
      this.errorMsg = 'content length should be not less then 3'
    } else this.errorMsg = ''
  }
  closeModal() {
    this.closeModalFunc.emit()
  }
  onSubmitBtn(event : any) {
    event.preventDefault()
    console.log(this.storyGroup.errors)
  }
}
