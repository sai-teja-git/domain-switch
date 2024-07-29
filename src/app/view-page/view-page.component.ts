import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-view-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.scss'
})
export class ViewPageComponent {

  key = "";
  value = "";

  ngOnInit() {
    this.updatePageTitle()
  }

  clear() {
    this.key = "";
    this.value = "";
  }

  pushData() {
    sessionStorage.setItem(this.key, this.value)
    this.clear()
  }

  clearSession() {
    sessionStorage.clear()
  }

  get sessionLength() {
    return sessionStorage.length
  }

  get sessionKeys() {
    const { length, ...data } = sessionStorage
    return data
  }

  deleteSessionKey(key: string) {
    sessionStorage.removeItem(key)
  }

  get currentHost() {
    return window.location.origin
  }

  goToApp() {
    let nextURL = environment.APP_ORIGIN;
    // const nextState = { additionalInformation: 'Updated the URL with JS' };
    if (this.currentHost === environment.APP_ORIGIN) {
      nextURL = environment.BASE_ORIGIN;
    }

    this.updatePageTitle()
    window.location.href = nextURL

    // This will create a new entry in the browser's history, without reloading
    // window.history.pushState(nextState, nextTitle, nextURL);

    // // This will replace the current entry in the browser's history, without reloading
    // window.history.replaceState(nextState, nextTitle, nextURL);
  }

  updatePageTitle() {
    let nextTitle = 'Domain | App';
    if (this.currentHost === environment.BASE_ORIGIN) {
      nextTitle = 'Domain | Base';
    }
    document.title = nextTitle
  }

}
