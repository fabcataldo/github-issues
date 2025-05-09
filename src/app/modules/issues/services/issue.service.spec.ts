import { TestBed } from '@angular/core/testing';
import { IssueService } from './issue.service';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { State } from '../interfaces/github-issues.interface';

const issueNumber = '123';
const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '#Hola mundo',
};

describe('IssueService', () => {
  let service: IssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: {
        destroyAfterEach: false,
      },
      providers: [provideTanStackQuery(new QueryClient())],
    });

    service = TestBed.inject(IssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load an issue', async () => {
    service.setIssueNumber(issueNumber);
    const { data } = await service.issueQuery.refetch();
    const issue = data!;

    expect(typeof issue.id).toBe('number');
    expect(typeof issue.node_id).toBe('string');
    expect(typeof issue.url).toBe('string');
    expect(typeof issue.body).toBe('string');
    expect(typeof issue.state).toBe('string');
    expect(issue.state).toEqual(State.Closed);
  });

  it('should load an issue by prefetching it', async () => {
    service.setIssueNumber(issueNumber);
    service.prefetchIssue(issueNumber);

    const { data } = await service.issueQuery.refetch();
    const issue = data!;

    expect(typeof issue.id).toBe('number');
    expect(typeof issue.node_id).toBe('string');
    expect(typeof issue.url).toBe('string');
    expect(typeof issue.body).toBe('string');
    expect(typeof issue.state).toBe('string');
    expect(issue.state).toBe(State.Closed);
  });

  it('should load issue comments', async () => {
    service.setIssueNumber(issueNumber);

    const { data, status } = await service.issueCommentsQuery.refetch();
    const issueComments = data!;

    expect(status.includes('success')).toBeTrue();

    if (issueComments.length > 0) {
      expect(typeof issueComments[0].id).toBe('number');
      expect(typeof issueComments[0].body).toBe('string');
      expect(typeof issueComments[0].url).toBe('string');
    }
  });
});
