import { Component, OnInit } from '@angular/core';
import { 
  faTachometerAlt,
  faFileAlt,
  faShoppingBag,
  faPaperPlane,
  faShoppingCart,
  faUser,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { ProfileService, AuthService } from 'src/app/services';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faTachometerAlt = faTachometerAlt;
  faFileAlt = faFileAlt;
  faShoppingBag = faShoppingBag;
  faPaperPlane = faPaperPlane;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;

  profile = {
    name: "",
    email: "",
    gender: "",
    age:""
  }

  constructor(
    private profileService: ProfileService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.profileService.profile().subscribe((resp)=>{
      this.profile.name = resp.name;
      this.profile.email = resp.email;
      this.profile.age = resp.age;
      if(resp.gender == 0){
        this.profile.gender = "Male";
      } else {
        this.profile.gender = "Female";
      }
    }, error => {

    })
  }
  
  logout(){
    this.authService.logout();
  }
}
