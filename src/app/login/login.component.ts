import { Component, OnInit } from '@angular/core';      
import { LoginService } from '../login.service';    
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';


@Component({    
  selector: 'app-login',    
  templateUrl: './login.component.html',    
  styleUrls: ['./login.component.css']    
})    
export class LoginComponent implements OnInit {    
  model: any = {};
  errorMessage: string = ''; // For displaying login errors

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
    this.translate.setDefaultLang('en');

    // Subscribe to NavigationEnd event
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Call a function or perform an action on the first load of the component
      this.onFirstLoad();
    });
  }

  onFirstLoad() {
    // Add logic to refresh or perform actions on the first load
    console.log('LoginComponent has been loaded for the first time.');
  }

  login() {
    this.loginService.Login(this.model).subscribe(
      (data) => {
        if (data === 'Success') {
          this.router.navigate(['/department']);
          this.loginService.isAuthenticated = true;
        } else {
          this.errorMessage = 'Please enter Correct Credentials';
          this.showErrorMessage(this.errorMessage);
        }
      },
      (error) => {
        this.errorMessage = 'Please enter Correct Credential';
        this.showErrorMessage(this.errorMessage);
      }
    );
  }

  showErrorMessage(message: string) {
    this.toastr.success(message, 'Error', {
      timeOut: 2000,
      toastClass: 'custom-error-toast', // Add your custom CSS class here
      positionClass: 'toast-bottom-center', // Adjust the position as needed    
      messageClass:'toast-body'
    });
  // this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
