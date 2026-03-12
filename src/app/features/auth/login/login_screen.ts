import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { Eye, LockKeyhole, User, LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    DividerModule,
    LucideAngularModule
  ],
  templateUrl: './login_screen.html',
  styleUrl: './login_screen.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginScreen {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly icons = {
    user: User,
    lock: LockKeyhole,
    eye: Eye
  };

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  submit(): void {
    if (this.form.invalid) return;
    this.router.navigate(['/dashboard']);
  }
}

 