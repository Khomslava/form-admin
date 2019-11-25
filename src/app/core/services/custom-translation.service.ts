import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslationService {
  constructor(
    private translate: TranslateService,
    private localStorage: LocalStorageService) {
    translate.addLangs(['en']);
  }

  public getUserLanguageFromLocalStorage() {
    const userLanguage = this.localStorage.retrieve('userLanguage');
    if (userLanguage) {
      return userLanguage;
    } else {
      return 'en';
    }
  }

  public checkCurrentUserLanguage() {
    const lang = this.getUserLanguageFromLocalStorage();
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  public setUserLanguageToLocalStorage(language) {
    this.localStorage.store('userLanguage', language);
    this.checkCurrentUserLanguage();
  }
}
