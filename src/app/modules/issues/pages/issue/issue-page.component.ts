import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IssueService } from '../../services/issue.service';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink, IssueCommentComponent],
  templateUrl: './issue-page.component.html',
})
export default class IssuePageComponent {
  issueService = inject(IssueService);
  route = inject(ActivatedRoute);

  issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((numberIssue: string) => {
        this.issueService.setIssueNumber(numberIssue);
      })
    )
  );

  issueQuery = this.issueService.issueQuery;
  issueCommentsQuery = this.issueService.issueCommentsQuery;
}
