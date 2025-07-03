import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
})
export class MenuComponent {
  menuItems = [
    { path: '/new-experimental-apis', title: 'New experimental APIs' },
    { path: '/promoting-zoneless', title: 'Promoting Zoneless' },
    { path: '/solidifying-angular-server', title: 'Solidifying Angular on the server' },
    { path: '/polishing-developer-experience', title: 'Polishing developer experience' },
    { path: '/deprecation-ngif-ngfor-ngswitch', title: 'Deprecation of NgIf, NgFor...' },
    { path: '/services-signals', title: 'Services Signals' }
  ];
}
