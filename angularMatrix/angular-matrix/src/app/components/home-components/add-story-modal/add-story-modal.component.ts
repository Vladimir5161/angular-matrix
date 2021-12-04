import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {FormErrorService} from "../../../services/form-error.service";

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
  token: string = ''
  constructor(private fb: FormBuilder, private apiService: ApiService, public formErrorService: FormErrorService) { }

  ngOnInit(): void {
    this.apiService.getToken().subscribe(token => {
      this.token = token
    })
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
    this.formErrorService.showErrorMessage( this.storyGroup, false, !!this.token)
  }
  closeModal() {
    this.closeModalFunc.emit()
  }
  onSubmitBtn(event : any) {
    event.preventDefault()
    console.log(this.storyGroup.errors)
  }
}
