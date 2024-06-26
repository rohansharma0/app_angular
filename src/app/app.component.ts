import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , AuthModule , AdminModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
}
