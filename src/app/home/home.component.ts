import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'ns-tabs',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  moduleId: module.id
})
export class HomeComponent implements OnInit {
  greeting: string = 'Welcome to UnityHealth';

  constructor() {
  }

  ngOnInit() {
    const dateTime = new Date();
    let time = dateTime.getHours();

    if (time >= 1 && time < 12) {
      this.greeting = 'Good Morning';
    } else {
      this.greeting = 'Good Evening';
    }
  }
}
