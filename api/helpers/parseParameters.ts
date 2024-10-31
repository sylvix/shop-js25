import { Parameter } from '../types';

const parseParameters = (parameters: string) => {
  try {
    return JSON.parse(parameters) as Parameter[];
  } catch (e) {
    return []
  }
}

export default parseParameters;