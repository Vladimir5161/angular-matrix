import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiAuthService} from "../../../services/api-auth.service";
import {FormErrorService} from "../../../services/form-error.service";
import {StoriesService} from "../../../services/stories.service";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-add-story-modal',
  templateUrl: './add-story-modal.component.html',
  styleUrls: ['./add-story-modal.component.scss']
})
export class AddStoryModalComponent implements OnInit {
  @Output()
  closeModalFunc = new EventEmitter<boolean>();
  storyGroup = this.fb.group({
    title: ['', {updateOn: 'blur',validators: Validators.compose([Validators.required, Validators.minLength(3)])}],
    content: ['', { updateOn: 'blur', validators: Validators.compose([Validators.required, Validators.minLength(5)])}],
  });
  token: string = ''
  constructor(private fb: FormBuilder,
              private apiService: ApiAuthService,
              public formErrorService: FormErrorService,
              private storiesService: StoriesService,
              public imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.apiService.getToken().subscribe(token => {
      this.token = token
    })
  }
  get storyGroupControls() {
    return this.storyGroup.controls;
  }

  getErrorMessage() {
    this.formErrorService.showErrorMessage( this.storyGroup, !!this.token)
  }
  closeModal() {
    this.closeModalFunc.emit()
  }
  onSubmitBtn(event : any) {
    event.preventDefault()
    this.storiesService.addPost(this.storyGroupControls.title.value, this.storyGroupControls.content.value, this.imageService.imageSrc)
    this.imageService.clearImage()
    this.closeModal()
  }
}
