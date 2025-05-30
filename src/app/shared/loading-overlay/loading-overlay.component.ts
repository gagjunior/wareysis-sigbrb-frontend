import {Component, Input} from '@angular/core';
import {Loader, LucideAngularModule, LucideIconData} from "lucide-angular";

@Component({
  selector: 'app-loading-overlay',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css'
})
export class LoadingOverlayComponent {
  @Input() visible: boolean = false;
  @Input() loaderIcon: LucideIconData = Loader;
}
