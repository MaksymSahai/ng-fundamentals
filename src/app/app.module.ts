import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from "@angular/common/http"

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  LocationValidator
} from './events/index'

import { appRoutes } from './routes';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { JQ_TOKEN, TOASTR_TOKEN, IToastr, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDerective } from './common/index'
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { VoterService }  from './events/event-details/voter.Service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let toastr:IToastr = window['toastr']
let jQuery = window['$']

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    NavBarComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    Error404Component,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDerective,
    LocationValidator,
    UpvoteComponent
  ],
  providers: [
    EventService, 
    {provide: TOASTR_TOKEN, useValue: toastr},
    {provide: JQ_TOKEN, useValue: jQuery},
    EventRouteActivator,
    AuthService,
    VoterService,
    EventListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')

  return true;
}
