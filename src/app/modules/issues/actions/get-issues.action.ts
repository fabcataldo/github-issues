import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GithubIssue, State } from '../interfaces/github-issues.interface';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;
export const getIssues = async (
  state: State = State.All,
  selectedLabels: string[]
): Promise<GithubIssue[]> => {
  //el sleep es solamente para demostrar que, aunque esté
  //tanstack, con las técnicas de obtención de datos antes
  //que el usuario haga click en el dato que quiere ver,
  //ya el dato se carga, entonces se le brinda una ux
  //más rápida y mejor, pero por eso
  // await sleep(1500);

  const params = new URLSearchParams();
  params.append('state', state);

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const resp = await fetch(`${BASE_URL}/issues?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!resp.ok) throw "Can't load issues";

    const labels: GithubIssue[] = await resp.json();

    return labels;
  } catch (error) {
    throw "Can't load issues";
  }
};
