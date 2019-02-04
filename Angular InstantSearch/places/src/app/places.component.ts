import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import places from "places.js";

@Component({
  selector: "app-places",
  template: `
    <input #input type="search" placeholder="Where are we going?" />
  `
})
export class PlacesComponent implements AfterViewInit, OnDestroy {
  private instance = null;

  @ViewChild("input") input;
  @Output() onChange? = new EventEmitter();
  @Output() onClear? = new EventEmitter();

  @Input() type: string;
  @Input() increment: string;
  @Input() increment_: number;

  ngAfterViewInit() {
    this.instance = places({
      appId: "pl6M28ZJIIFM",
      apiKey: "6e4b81520a26ea955c5b3b831ba84955",
      container: this.input.nativeElement,
      type: this.type
    });
    this.instance.on("change", e => {
      this.onChange.emit(e);
    });

    this.instance.on("clear", e => {
      this.onClear.emit(e);
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      const { currentValue } = changes.type;
      this.instance.configure({ type: currentValue });
    }
  }
  ngOnDestroy() {
    this.instance.removeAllListeners("change");
    this.instance.removeAllListeners("clear");
    this.instance.destroy();
  }
}
