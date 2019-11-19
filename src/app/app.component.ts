import { Component } from '@angular/core';

import { CustomTranslationService } from './core/services/custom-translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public customTranslateService: CustomTranslationService) {
    this.customTranslateService.checkCurrentUserLanguage();
  }
}
