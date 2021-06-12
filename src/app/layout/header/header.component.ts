import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser'));
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    sessionStorage.clear()
    this.router.navigate([''])
  }
}
