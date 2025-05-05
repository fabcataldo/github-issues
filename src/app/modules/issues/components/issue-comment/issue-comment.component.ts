import { Component, input } from '@angular/core';
import { GithubIssue } from '../../interfaces/github-issues.interface';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  standalone: true,
  templateUrl: './issue-comment.component.html',
})
export class IssueCommentComponent {
  issue = input.required<GithubIssue>();
}
