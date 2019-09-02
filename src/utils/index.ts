import {parse} from 'graphql';

import {HTTPHeaders, HTTPMethods} from '../enums';

import {Header} from '../components/config/headers/Headers';

export const methodHasPayload = (method: HTTPMethods) => (
  ![HTTPMethods.GET, HTTPMethods.HEAD]
    .includes(method)
)


export const regEx = {
  url: /^((?:http(?:s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+))+([\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+)$/gim,
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
  const url = domain
    + ((domain.charAt(domain.length-1) !== '/' && endpoint.charAt(0) !== '/')
      ? '/'
      : '')
    + endpoint;

  const possUrl = (url).match(regEx.url);
  return (!possUrl || possUrl[0] !== url) ? false : true;
}

export const isValidHeaders = (headers: Header[]): boolean => {
  const types = Object.values(HTTPHeaders)
  return headers.reduce(
    (_: boolean, curr: Header) => {
      return types.includes(curr.type); // TODO: validate the value
    },
    true,
  );
}

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
