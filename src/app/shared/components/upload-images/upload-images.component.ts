import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit, OnChanges {
  files: File[] = [];
  newFiles: any[];
  indexCurrentElement;
  imagesSrc = [];

  draggable = {
    data: 'myDragData',
    effectAllowed: 'all',
    disable: false,
    handle: false
  };

  @Input() initialFiles: any;
  @Output() uploadedImages = new EventEmitter<any>();

  constructor(

  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.initialFiles && this.initialFiles) {
      let files = [];
      for (const key in this.initialFiles) {
        files.push(this.initialFiles[key]);
      }
      files = files.sort((a, b) => a.order - b.order);
      this.files = files;
      this.imagesSrc = files;
    }
  }

  handleFiles(event) {
    if (this.imagesSrc.length <= 30) {
      this.newFiles = Array.from(event.target.files);
      for (let i = 0; i < this.newFiles.length; i++) {
        if (this.imagesSrc.length + i >= 30) {
          this.newFiles.splice(i, 1);
          i--;
        }
      }
      const tempFile = this.files;
      this.files = this.newFiles;

      for (let i = 0; i < this.files.length; i++) {
        const reader = new FileReader();
        const that = this;
        reader.onload = (function (f) {
          return function (e) {
            if (that.imagesSrc.length < 30) {
              const reader = e.target;
              that.imagesSrc.push({ 'url': reader.result, 'index': i });
              if (that.imagesSrc.length === that.files.length) {
                that.imagesSrc.sort((a, b) => a.index - b.index);
              }

            }
          };
        })();
        reader.readAsDataURL(this.files[i]);
      }
      this.files = this.newFiles.concat(tempFile);
      this.checkMainImage();
      this.uploadedImages.emit(this.files);
    }
  }

  removeImage(index: number) {
    this.imagesSrc.splice(index, 1);
    this.files.splice(index, 1);
    this.files.slice(this.files.length, 1);
    this.checkMainImage();
    this.uploadedImages.emit(this.files);
  }

  onDrop(event: DndDropEvent, list: any) {
    if (event.index !== this.indexCurrentElement) {
      if (event.index < this.indexCurrentElement) {
        list.splice(event.index, 0, list[this.indexCurrentElement]);
        list.splice(this.indexCurrentElement + 1, 1);
        this.files.splice(event.index, 0, this.files[this.indexCurrentElement]);
        this.files.splice(this.indexCurrentElement + 1, 1);
      } else {
        list.splice(event.index, 0, list[this.indexCurrentElement]);
        list.splice(this.indexCurrentElement, 1);
        this.files.splice(event.index, 0, this.files[this.indexCurrentElement]);
        this.files.splice(this.indexCurrentElement, 1);
      }
      this.checkMainImage();
      this.uploadedImages.emit(this.files);
    }
  }

  checkMainImage() {
    const checkedMainImageIndex = this.files.findIndex(item => item['showOnMainPage'] === true);
    this.files.forEach((item, i) => {
      if (checkedMainImageIndex !== i) {
        item['showOnMainPage'] = false;
      }
    });
    if (checkedMainImageIndex === -1) {
      this.files[0]['showOnMainPage'] = true;
    }
  }

  onDragStart(index) {
    this.indexCurrentElement = index;
  }

  showMainImage(checkedImage) {
    if (checkedImage) {
      this.files.forEach(item => item['showOnMainPage'] = false);
      this.files[checkedImage]['showOnMainPage'] = true;
      this.uploadedImages.emit(this.files);
    }
  }

}
