import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private readonly cookieService: CookieService
  ) { }

  ngOnInit() {
    this.updatePageTitle()
    this.getCookies()
  }


  clear() {
    this.key = "";
    this.value = "";
  }

  pushData() {
    sessionStorage.setItem(this.key, this.value)
    localStorage.setItem(this.key, this.value)
    // this.cookieService.set(this.key, this.value, (15 * 60 * 1000))
    this.cookieService.set(this.key, this.value, (15 * 60 * 1000), "/", "localhost")
    this.cookieService.set(this.key, this.value, (15 * 60 * 1000), "/", "domain-switch-base.onrender.com")
    this.cookieService.set(this.key, this.value, (15 * 60 * 1000), "/", "domain-switch-app.onrender.com")
    this.clear()
  }

  clearSession() {
    sessionStorage.clear()
  }

  clearLocal() {
    localStorage.clear()
  }

  clearCookies() {
    this.cookieService.deleteAll()
  }

  getCookies() {
    console.log("cookies", this.cookies)
  }

  get sessionLength() {
    return sessionStorage.length
  }

  get localLength() {
    return localStorage.length
  }

  get cookieLength() {
    try {
      return Object.keys(this.cookieService.getAll()).length
    } catch { }
    return 0
  }

  get sessionKeys() {
    const { length, ...data } = sessionStorage
    return data
  }

  get localKeys() {
    const { length, ...data } = localStorage
    return data
  }

  get cookies() {
    try {
      return this.cookieService.getAll()
    } catch { }
    return {}
  }

  deleteSessionKey(key: string) {
    sessionStorage.removeItem(key)
  }

  deleteLocalKey(key: string) {
    localStorage.removeItem(key)
  }

  deleteCookie(key: string) {
    this.cookieService.delete(key)
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
