import { environment } from 'src/environments/environment';
import { getIssueByNumber } from './get-issue-by-number';

const issueNumber = '123';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;
const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '#Hola mundo',
};

describe('GetIssueByNumber action', () => {
  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    expect(issue.id).toEqual(Number(issueNumber));
  });

  it('should not fetch issue successfully', async () => {
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      await getIssueByNumber(issueNumber);

      //because above call with throw null
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Can't load issue ${issueNumber}`);
    }
  });
});
