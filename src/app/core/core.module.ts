
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

// Firabase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const quillConfig = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ align: [] }, { indent: '-1' }, { indent: '+1' }, { list: 'ordered' }, { list: 'bullet' }],
      // [{ direction: 'rtl' }],                         // text direction
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }, 'link'],
      [{ script: 'sub' }, { script: 'super' }]
    ]
  }
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FlexLayoutModule,
    QuillModule.forRoot(quillConfig),
    NgxWebstorageModule.forRoot(),
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    TranslateModule,
    NgxWebstorageModule,
    FlexLayoutModule,
    QuillModule
  ]
})
export class CoreModule { }
