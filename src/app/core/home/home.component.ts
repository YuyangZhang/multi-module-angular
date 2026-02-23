import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  currentTab: 'all' | 'favorites' = 'favorites';
  favoriteIds: string[] = [];

  modules = [
    {
      id: 'data-query',
      name: 'Data Query Module',
      description: 'Query and view data from backend API.',
      bgStyle: 'linear-gradient(135deg, #1b539c 0%, #089fd1 100%)',
      logo: 'DQ'
    },
    {
      id: 'external-app',
      name: 'External App',
      description: 'Load an external application via Iframe.',
      bgStyle: 'linear-gradient(135deg, #4b1b9c 0%, #ca08d1 100%)',
      logo: 'EA'
    }
  ];

  ngOnInit() {
    const saved = localStorage.getItem('favoriteModules');
    if (saved) {
      this.favoriteIds = JSON.parse(saved);
    } else {
      this.favoriteIds = this.modules.map(m => m.id);
      this.saveFavorites();
    }
  }

  searchTerm: string = '';

  saveFavorites() {
    localStorage.setItem('favoriteModules', JSON.stringify(this.favoriteIds));
  }

  toggleFavorite(moduleId: string, event: Event) {
    event.stopPropagation();
    const index = this.favoriteIds.indexOf(moduleId);
    if (index === -1) {
      this.favoriteIds.push(moduleId);
    } else {
      this.favoriteIds.splice(index, 1);
    }
    this.saveFavorites();
  }

  removeFavorite(moduleId: string, event: Event) {
    event.stopPropagation();
    this.favoriteIds = this.favoriteIds.filter(id => id !== moduleId);
    this.saveFavorites();
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  get displayedModules() {
    let filtered = this.modules;

    if (this.currentTab === 'favorites') {
      filtered = filtered.filter(m => this.favoriteIds.includes(m.id));
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(m => m.name.toLowerCase().includes(term));
    }

    return filtered;
  }

  openWorkspace(moduleId: string) {
    this.router.navigate(['/workspace', moduleId]);
  }
}
