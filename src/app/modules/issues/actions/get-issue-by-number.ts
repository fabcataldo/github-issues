import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment.development';
import { GithubIssue } from '../interfaces/github-issues.interface';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;
export const getIssueByNumber = async (
  issueNumber: string
): Promise<GithubIssue> => {
  await sleep(1500);

  console.log('entrooo');
  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!resp.ok) throw "Can't load issues";

    console.log('getissuebynumber');
    console.log(resp);
    const issue: GithubIssue = await resp.json();

    return issue;
  } catch (error) {
    throw "Can't load issue";
  }
};
