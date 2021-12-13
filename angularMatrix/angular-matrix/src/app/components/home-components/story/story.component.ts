import {Component, Input, OnInit} from '@angular/core';
import {Author, Post} from "../../../types/posts.types";
import {StoriesService} from "../../../services/stories.service";
import {ModalService} from "../../../services/modal.service";
import {defaultImage, defaultPost} from '../../../../constants'
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: Post = defaultPost
  defaultImage: string = ''
  constructor(private storiesService: StoriesService, private modalService: ModalService, public imageService: ImageService) { }

  ngOnInit(): void {
    this.defaultImage = defaultImage
  }
  likeUnlikePost() {
    this.storiesService.likeUnlikePost(this.story.id, this.story.isLikedByCurrentUser)
  }
  openModal(event: any) {
    event.preventDefault()
    this.modalService.openModal(this.story.id)
  }
}
