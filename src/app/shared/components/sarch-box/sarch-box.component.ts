import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'shared-sarch-box',
  templateUrl: './sarch-box.component.html',
  styles: [],
})
export class SarchBoxComponent implements OnInit, OnDestroy {
  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>;

  @Input()
  placeHolder: string = '';

  @Input()
  initialValue?: string = '';

  @Output()
  onDebounce = new EventEmitter<string>();

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubs?: Subscription;

  ngOnInit(): void {
    this.debouncerSubs = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  onKeyPress(searchTherm: string) {
    this.debouncer.next(searchTherm);
  }

  ngOnDestroy(): void {
    this.debouncerSubs?.unsubscribe();
  }
}
