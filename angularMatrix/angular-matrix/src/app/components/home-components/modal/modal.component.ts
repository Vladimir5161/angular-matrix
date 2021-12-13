import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {StoriesService} from "../../../services/stories.service";
import {Post} from "../../../types/posts.types";
import {ImageService} from "../../../services/image.service";
import {defaultImage, defaultPost} from '../../../../constants'


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('titleEdit', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if(element) {
      element.nativeElement.focus()
    }
  }
  @ViewChild('contentEdit', { static: false })
  set textArea(element: ElementRef<HTMLInputElement>) {
    if(element) {
      element.nativeElement.focus()
    }
  }
  defaultImage: string = ''
  visible: boolean = false;
  story: Post = defaultPost;
  titleEdit: boolean = false;
  titleEditText: string = '';
  updatedDate: string = '';
  contentEdit: boolean = false;
  contentEditText: string = ''
  constructor(public modalService: ModalService, private storiesService: StoriesService, public imageService: ImageService) { }

  ngOnInit(): void {
    this.defaultImage = defaultImage
    this.modalService.getModal().subscribe(value => {
      this.visible = value.visible;
      if(value.visible) {
        const story = this.storiesService.getStory(value.postId)
        if (story) {
          this.titleEditText = story.title
          this.contentEditText = story.content
          this.updatedDate = story.updatedDate
          this.story = story;
        }
      }
    })
  }
  ngOnDestroy() {
    this.modalService.getModal().unsubscribe()
  }

  edit(value: boolean, content?: boolean) {
    if(!value) {
      this.storiesService.updatePost(this.titleEditText, this.contentEditText, this.story.id)
    }
    if(!content) {
      this.titleEdit = value
    } else {
      this.contentEdit = value
    }
  }
  closeModal() {
      this.story = defaultPost;
      this.modalService.closeModal()
  }
  updatePostImage(event: any) {
    event.preventDefault()
    this.storiesService.updatePostImage(this.story.id, this.imageService.imageSrc)
    this.imageService.clearImage()
  }
  cancelUpload(event: any) {
    event.preventDefault()
    this.imageService.clearImage()
  }
}
