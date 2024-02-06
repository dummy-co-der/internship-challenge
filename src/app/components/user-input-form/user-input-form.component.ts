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
    'https://user-images.githubusercontent.com/26748614/96337246-f14d4580-1085-11eb-8793-a86d929e034d.jpg';

  onSubmit() {
    if (this.username.trim()) {
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
    } else {
      this.toastr.error('Please enter a valid GitHub username.');
    }
  }
}
