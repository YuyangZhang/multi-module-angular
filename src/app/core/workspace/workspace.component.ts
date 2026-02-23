import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabService } from './tab.service';
import { DataQueryComponent } from '../../features/data-query/data-query.component';
import { ExternalIframeComponent } from '../../features/external-iframe/external-iframe.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  private routeSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    public tabService: TabService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const moduleId = params.get('moduleId');
      if (moduleId) {
        this.openModule(moduleId);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  openModule(moduleId: string) {
    if (moduleId === 'data-query') {
      this.tabService.addTab({
        id: 'data-query',
        title: 'Data Query',
        componentType: DataQueryComponent
      });
    } else if (moduleId === 'external-app') {
      this.tabService.addTab({
        id: 'external-app',
        title: 'External App',
        componentType: ExternalIframeComponent
      });
    } else {
      console.warn('Unknown module: ', moduleId);
    }
  }

  closeTab(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.tabService.removeTab(index);
  }

  onTabChange(index: number) {
    this.tabService.setActiveTab(index);
  }
}
