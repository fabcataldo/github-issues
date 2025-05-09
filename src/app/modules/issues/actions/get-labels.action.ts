import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;
export const getLabels = async (): Promise<GithubLabel[]> => {
  //el sleep es solamente para demostrar que, aunque esté
  //tanstack, con las técnicas de obtención de datos antes
  //que el usuario haga click en el dato que quiere ver,
  //ya el dato se carga, entonces se le brinda una ux
  //más rápida y mejor, pero por eso
  // await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!resp.ok) throw "Can't load labels";

    const labels: GithubLabel[] = await resp.json();

    return labels;
  } catch (error) {
    throw "Can't load labels";
  }
};
