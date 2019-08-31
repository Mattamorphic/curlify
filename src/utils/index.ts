import {parse} from 'graphql';

import {HTTPMethods} from '../enums';

export const methodHasPayload = (method: HTTPMethods) => (
  ![HTTPMethods.GET, HTTPMethods.HEAD]
    .includes(method)
)


export const regEx = {
  url: /(http(?:s)?(?::\/\/)+[www]{0,1}.?(?:[\w-.])*.[a-zA-Z]{2,3})\/?(\/[^\s\b\n|]*[^.,;:?!@^$ -]{0,})/gim,
  curlHeader: /(?:-H ")([\w\d]{1,})(?:\s{0,}:\s{0,})(.+?)(?=")/gim,
  curlMethod: /(?:-X\s{0,})(\w{3,6})/gim,
  // Todo: convert to /gms https://github.com/babel/babel/pull/10347
  curlData: /(?:-d\s{0,}'|")({.*})(?=['|"])/gim,
  newLine: /[\r|\n]/gm,
  newLineAndTab: /[\n|\r|\t]/gm,
  multipleSpaces: / +/gm,
}


export const isValidMethod = (string: string): boolean => (
  Object
  .values(HTTPMethods)
  .includes(string)
)

export const isValidURL = (domain: string, endpoint: string): boolean => {
  const url = domain + '/' + endpoint;
  const possUrl = (url).match(regEx.url);
  return (!possUrl || possUrl[0] !== url) ? false : true;
}

export const isValidHeaders = (_: []): boolean => (
  true
)

export const isValidJsonString = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch (_) {
    return false;
  }
}

export const isValidGraphQLString = (gql: string) => {
  try {
    parse(gql);
    return true;
  } catch (_) {
    return false;
  }
}
