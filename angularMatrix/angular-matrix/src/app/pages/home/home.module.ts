import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {StoryComponent} from "../../components/home-components/story/story.component";
import {StoriesListComponent} from "../../components/home-components/stories-list/stories-list.component";
import {SearchComponent} from "../../components/home-components/search/search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddStoryModalComponent} from "../../components/home-components/add-story-modal/add-story-modal.component";
import {MomentPipe} from "../../pipes/moment.pipe";
import {SearchPipe} from "../../pipes/search.pipe";
import {ModalComponent} from "../../components/home-components/modal/modal.component";
import {SortPipe} from "../../pipes/sort.pipe";



@NgModule({
  declarations: [
    HomeComponent,
    StoriesListComponent,
    StoryComponent,
    SearchComponent,
    AddStoryModalComponent,
    MomentPipe,
    SearchPipe,
    SortPipe,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule { }
