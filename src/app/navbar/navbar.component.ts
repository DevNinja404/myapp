import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDefaultRouteLogin: boolean = false;
  constructor(private router: Router ,private translate: TranslateService,private route: ActivatedRoute) { }
  selectedLanguage: string = 'en'; // Default language
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the active route is 'login'
        this.isDefaultRouteLogin = event.url === '/login';
        this.translate.setDefaultLang('en');
      }
    });
  }

  // Function to change the language
  // changeLanguage(language: string) {
  //   this.translate.use(language);
  // }

  changeLanguage(language: string) {
    // Set the selected language in the translation service
    this.translate.use(language);
  
    // Update the route's query parameters with the selected language
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lang: language },
      queryParamsHandling: 'merge', // Keep existing query parameters
    });
  }

  navigateToSo2Operation(language: string) {
    console.log(`Navigating to so2operation with language: ${language}`);
    this.router.navigate(['/so2operation'], { queryParams: { lang: language } });
  }
  
  
}
