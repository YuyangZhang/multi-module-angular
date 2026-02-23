import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-external-iframe',
  templateUrl: './external-iframe.component.html',
  styleUrl: './external-iframe.component.scss'
})
export class ExternalIframeComponent implements OnInit {
  iframeUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // A safe external URL for demonstration
    const url = 'https://angular.dev/';
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
