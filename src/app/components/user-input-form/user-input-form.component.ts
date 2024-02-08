import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-input-form',
  templateUrl: './user-input-form.component.html',
  styleUrls: ['./user-input-form.component.scss'],
})
export class UserInputFormComponent {
  username: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  imageUrl =
    'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  onSubmit() {
    const githubUsernameRegex =
      /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;

    if (
      !this.username.trim() ||
      !githubUsernameRegex.test(this.username.trim())
    ) {
      this.toastr.error('Please enter a valid GitHub username.');
      return;
    }
    this.apiService.getUser(this.username).subscribe({
      next: (response) => {
        this.apiService.userName = this.username.trim();
        this.apiService.userDetail = response;
        this.router.navigate(['/user-details']);
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }
}
