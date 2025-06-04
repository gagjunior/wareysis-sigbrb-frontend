import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {LucideAngularModule, LucideIconData, Menu} from 'lucide-angular';
import {AuthService} from '../../../core/auth/auth.service';
import {take} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  imports: [
    LucideAngularModule,
    DatePipe
  ],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent implements OnInit {

  private readonly authService = inject(AuthService)
  protected readonly menuIcon: LucideIconData = Menu;

  displayName?: string | null;
  lastSignInTime?: string | null;

  @Output() menuClicked = new EventEmitter<void>();

  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe(user => {
      this.displayName = user?.displayName;
      this.lastSignInTime = user?.metadata.lastSignInTime;
    });
  }

}
