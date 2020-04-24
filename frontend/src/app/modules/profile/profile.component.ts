import { Component, OnInit } from '@angular/core';
import { 
  faTachometerAlt,
  faFileAlt,
  faShoppingBag,
  faPaperPlane,
  faShoppingCart,
  faUser,
  faCog
} from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
