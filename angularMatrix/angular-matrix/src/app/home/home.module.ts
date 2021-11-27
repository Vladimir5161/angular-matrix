import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {StoryComponent} from "../components/home-components/story/story.component";
import {StoriesListComponent} from "../components/home-components/stories-list/stories-list.component";
import {SearchComponent} from "../components/home-components/search/search.component";
import {AddComponent} from "../components/home-components/add/add.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddStoryModalComponent} from "../components/home-components/add-story-modal/add-story-modal.component";



@NgModule({
  declarations: [HomeComponent, StoriesListComponent, StoryComponent, SearchComponent, AddComponent, AddStoryModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule { }
