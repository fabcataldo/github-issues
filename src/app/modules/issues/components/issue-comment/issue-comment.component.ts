import { Component, input, OnInit } from '@angular/core';
import { GithubIssue } from '../../interfaces/github-issues.interface';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  standalone: true,
  templateUrl: './issue-comment.component.html',
})
export class IssueCommentComponent implements OnInit {
  issue = input.required<GithubIssue>();
  ngOnInit(): void {
    console.log('ssiue');
    console.log(this.issue());
  }
}
