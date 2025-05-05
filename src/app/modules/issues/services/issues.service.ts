import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions/get-labels.action';
import { getIssues } from '../actions';
import { State } from '../interfaces/github-issues.interface';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  selectedLabels = signal(new Set<string>());
  selectedState = signal<State>(State.All);

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this.selectedState(),
        selectedLabels: [...this.selectedLabels()],
      },
    ],
    queryFn: () => getIssues(this.selectedState(), [...this.selectedLabels()]),
  }));

  showIssuesByState(state: State) {
    this.selectedState.set(state);
  }

  toggleLabel(label: string) {
    const labels = this.selectedLabels();
    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this.selectedLabels.set(new Set(labels));
  }
}
