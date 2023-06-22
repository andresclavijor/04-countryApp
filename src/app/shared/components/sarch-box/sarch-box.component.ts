import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-sarch-box',
  templateUrl: './sarch-box.component.html',
  styles: [
  ]
})
export class SarchBoxComponent {
  @ViewChild('txtInput') public txtInput!: ElementRef<HTMLInputElement>
  @Input() placeHolder: string = '';
  @Output() searchText = new EventEmitter<string>();

  search() {
    const searchText = this.txtInput.nativeElement.value;
    this.searchText.emit(searchText);
  }
}
