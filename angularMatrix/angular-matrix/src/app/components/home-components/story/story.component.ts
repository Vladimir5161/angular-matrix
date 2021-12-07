import {Component, Input, OnInit} from '@angular/core';
import {Author} from "../../../types/posts.types";
import {StoriesService} from "../../../services/stories.service";
import {ModalService} from "../../../services/modal.service";
import {defaultImage} from '../../../../constants'
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() title: string = ''
  @Input() content: string = ''
  @Input() createdDate: string = ''
  @Input() updatedDate: string = ''
  @Input() imageUrl: string | null = ''
  @Input() likesCount: number = 0
  @Input() author: Author | null = null
  @Input() isLikedByCurrentUser: boolean = false
  @Input() postId: string = ''
  defaultImage: string = ''
  constructor(private storiesService: StoriesService, private modalService: ModalService, public imageService: ImageService) { }

  ngOnInit(): void {
    this.defaultImage = defaultImage
  }
  likeUnlikePost() {
    this.storiesService.likeUnlikePost(this.postId, this.isLikedByCurrentUser)
  }
  openModal(event: any) {
    event.preventDefault()
    this.modalService.openModal(this.postId)
  }
}
