import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions';
import { getIssueCommentsByNumber } from '../actions/get-issue-comments-by-number';
import { GithubIssue } from '../interfaces/github-issues.interface';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);
  private queryClient = inject(QueryClient);

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),

    //llamar a esta query solo cuando issuenumber cambie de valor
    enabled: this.issueNumber() !== null,
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId);
  }

  prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5,
    });
  }

  setIssueData(issue: GithubIssue) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      //con esto no va a volver a caargar la data, ya que se considera fresca
      updatedAt: Date.now() + 1000 * 60, //1 minuto
    });
  }
}
