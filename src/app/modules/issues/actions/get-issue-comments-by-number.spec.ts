import { environment } from 'src/environments/environment';
import { getIssueCommentsByNumber } from './get-issue-comments-by-number';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;
const issueNumber = '123';
const mockComments: any[] = [
  { id: 1, body: 'First Comment', user: { login: 'user1' } },
  { id: 2, body: 'Second comment', user: { login: 'user2' } },
];

describe('getIssueCommentsByNumber action', () => {
  it('should fetch issue comments successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueCommentsResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    const issueComments = await getIssueCommentsByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    expect(issueComments[0].id).toEqual(mockComments[0].id);
  });

  it('should throw an error if the response is not ok', async () => {
    const issueCommentsResp = new Response(JSON.stringify(mockComments), {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResp);
    try {
      await getIssueCommentsByNumber(issueNumber);

      //because above call with throw null
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe("Can't load issue comments");
    }
  });
});
