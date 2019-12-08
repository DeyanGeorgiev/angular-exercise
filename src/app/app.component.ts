import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-exercise';

  // this is view - debug purposes only ....
  payload;

  handleUserUpdated(event : Event) {
    this.payload = event
    
  }

}
