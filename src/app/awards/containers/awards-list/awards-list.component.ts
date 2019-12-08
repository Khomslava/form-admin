import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';

import { throwError, of } from 'rxjs';
import { map, catchError, tap, zip, combineLatest } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Store, Select } from '@ngxs/store';

import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AwardsState } from '../../store/awards.state';
import { IAward } from '../../models/awards.model';
import * as AwardsActions from '../../store/awards.actions';


@Component({
  selector: 'app-awards-list',
  templateUrl: './awards-list.component.html',
  styleUrls: ['./awards-list.component.scss']
})
export class AwardsListComponent implements OnInit {
  awards = [];
  displayedColumns: string[] = ['order', 'logo', 'name', 'amountNominations', 'actions'];
  dataSource: MatTableDataSource<IAward[]>;


  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public translateService: TranslateService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new AwardsActions.LoadAwards());
    this.getAwards();
  }


  getAwards() {
    this.store.select(AwardsState.awards)
      .subscribe( (awards: IAward[]) => {
        awards = this.sortByOrder(awards);
        // projects = this.setProjectsOrders(projects);
        this.awards = awards;
        this.dataSource = new MatTableDataSource(this.awards);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmDeleteAward(award: any, index: number, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        content: {
          title: 'project.delete_award',
          text: 'project.if_you_delete_award',
          cancel: 'general.cancel',
          confirm: 'general.delete'
        }
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && award.id) {
        this.store.dispatch(new AwardsActions.DeleteAward(award.id));
      }
    });
  }

  private deleteAward(project, index: number) {
    // this.projectService
    // .deleteProject(project.id)
    // .pipe(
    //   catchError((err) => {
    //     this.openSnackBar(this.translateService.instant('project.project_didnt_deleted'));
    //     return throwError(err);
    //   }
    // ))
    // .subscribe(() => {
    //   this.openSnackBar(this.translateService.instant('project.project_was_deleted'));
    //   this.projects.splice(index, 1);
    //   this.projects = this.setProjectsOrders(this.projects);
    //   this.dataSource = new MatTableDataSource(this.projects);
    //   this.saveAllProjects();
    // });
  }


  private updateAward(project) {
    // this.projectService
    // .updateProject(project.id, project)
    // .pipe(
    //   catchError((err) => {
    //     this.openSnackBar(this.translateService.instant('project.project_didnt_updated'));
    //     return throwError(err);
    //   }
    // ))
    // .subscribe(() => {
    //   this.openSnackBar(this.translateService.instant('project.project_was_updated'));
    //   this.projects = this.projects.filter(proj => proj.categoryId.some(category => category === 'product'));
    //   this.projects = this.setProjectsOrders(this.projects);
    //   this.dataSource = new MatTableDataSource(this.projects);
    //   this.saveAllProjects();
    // });
  }

  createAward() {
    this.router.navigate(['/awards/new']);
  }

  goToAward(award) {
    this.router.navigate([`/awards/${award.id}`]);
  }

  moveAwardUp(index: number, event: Event) {
    event.stopPropagation();
    if (this.awards[index - 1]) {
      this.awards[index].index = index - 1;
      this.awards[index - 1].index = index;
      // this.store.dispatch(new AwardsActions.UpdateAward(this.awards[index])).subscribe()
      combineLatest(
        this.store.dispatch(new AwardsActions.UpdateAward(this.awards[index])),
        this.store.dispatch(new AwardsActions.UpdateAward(this.awards[index - 1]))
        )
        .pipe(map(res => {
          debugger;
          return of();
        }))
        .subscribe(res => {
          this.awards = this.sortByOrder(this.awards);
          this.dataSource = new MatTableDataSource(this.awards);
        });

      // this.projectService.updateProjectFirebase(this.projects[index].id, this.projects[index]);
      // this.projectService.updateProjectFirebase(this.projects[index - 1].id, this.projects[index - 1]);

    }
  }

  moveAwardDown(index: number, event: Event) {
    event.stopPropagation();
    if (this.awards[index + 1]) {
      this.awards[index].index = index + 1;
      this.awards[index + 1].index = index;
      // this.store.dispatch(new UpdateAward(this.awards[index]));
      // this.store.dispatch(new UpdateAward(this.awards[index + 1]));
      // this.projectService.updateProjectFirebase(this.projects[index].id, this.projects[index]);
      // this.projectService.updateProjectFirebase(this.projects[index + 1].id, this.projects[index + 1]);
      this.awards = this.sortByOrder(this.awards);
      this.dataSource = new MatTableDataSource(this.awards);
    }
  }


  private saveAllAwards() {
    // this.projects.forEach(project => this.projectService.updateProjectFirebase(project.id, project));
  }

  private sortByOrder(awards): any[] {
    return awards.sort((a, b) => {
      return a.index - b.index;
    });
  }

  private setAwardsOrders(awards): any[] {
    awards.forEach((award, i) => {
      if (award.index) {
        award.index = i;
      }
    });
    return awards;
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }


}
