import {Component, inject, Input} from '@angular/core';
import {LucideAngularModule, LucideIconData} from "lucide-angular";
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css'
})
export class SidebarItemComponent {

  private readonly router: Router = inject(Router)

  @Input() icon!: LucideIconData;
  @Input() label!: string;
  @Input() route?: string;
  @Input() action?: () => void;
  @Input() onClick?: () => void;

  handleClick() {

    if (this.action) {
      this.action();
    } else if (this.route) {
      this.router.navigateByUrl(this.route);
    }

    if (this.onClick) {
      this.onClick(); // Ex: fechar menu
    }
  }

}
