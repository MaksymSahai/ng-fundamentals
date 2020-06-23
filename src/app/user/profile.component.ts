import { Component, OnInit, Inject, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { TOASTR_TOKEN, IToastr} from '../common/toastr.service'

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float:right; color: #E05C65; padding-left: 10px;}
    .error input {background-color: #E3C3C5}
    .error ::-webkit-input-placeholder {color: #999}
    .error ::-moz-placeholder {color: #999}
    .error :-moz-placeholder {color: #999}
    .error ::ms-input-placeholder {color: #999}
  `]
})
export class ProfileComponent implements OnInit {

  profileForm:FormGroup
  firstName:FormControl
  lastName:FormControl

  constructor(
    private authService:AuthService, 
    private router:Router,
    @Inject(TOASTR_TOKEN) private toastr:IToastr){}

  ngOnInit(){
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('^[A-Za-z]+$')])
    this.lastName = new FormControl(this.authService.currentUser.lastName, [Validators.required, Validators.pattern('^[A-Za-z]+$')])
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  cancel(){
    this.router.navigate(['events']);
  }

  saveProfile(formValues){
    if(this.profileForm.valid){
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
      this.toastr.success('Profile saved')
    }
  }

  validateLastName(){
    return this.lastName.valid || this.lastName.untouched
  }

  validateFirstName(){
    return this.firstName.valid || this.firstName.untouched
  }
       
}