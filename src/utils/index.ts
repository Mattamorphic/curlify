import {parse} from 'graphql';

import {HTTPHeaders, HTTPMethods} from '../enums';

import {ConfigData} from '../components/config/Config';
import {DataData} from '../components/data/Data';
import {Header} from '../components/config/headers/Headers';
import {HistoryEntry} from '../components/history/History';
import {ProxyData} from '../components/test/request/proxy/Proxy';

export const methodHasPayload = (method: HTTPMethods) => (
  ![HTTPMethods.GET, HTTPMethods.HEAD]
    .includes(method)
)

export const PROXY = "https://curlify-proxy.herokuapp.com/";

export const regEx = {
  url: /^((?:http(?:s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+))+([\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+)$/gim,
  curlHeader: /(?:-H ")([\w\d]{1,})(?:\s{0,}:\s{0,})(.+?)(?=")/gim,
  curlMethod: /(?:-X\s{0,})(\w{3,6})/gim,
  // Todo: convert to /gms https://github.com/babel/babel/pull/10347
  curlData: /(?:-d\s{0,}'|")({.*})(?=['|"])/gim,
  dateTimeZoneChars: /[T|Z]/gim,
  jsonData: /^( *)("[^"]+": )?("[^"].*"|[\w.+-]*)?([{}[\],]*)?$/mg,
  newLine: /[\r|\n]/gm,
  newLineAndTab: /[\n|\r|\t]/gm,
  multipleSpaces: / +/gm,
  quotes:/[\"\']/gim,
  singleEscapedNewLine: /(?<!\\)\\n/gm,

};

// export const hasDataChanged = (
//   prevData: DataData,
//   newData: DataData
// ): boolean => {
//   return false;
// }
//
// export const hasConfigChanged = (
//   prevData: DataData,
//   newData: DataData
// ): boolean => {
//   return false;
// }

export const hasProxyChanged = (
  prevProxy: ProxyData,
  newProxy: ProxyData
): boolean => {
  return prevProxy.isEnabled !== newProxy.isEnabled
    || prevProxy.url !== newProxy.url;
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

export const isStringANumber = (value: string): boolean => {
  return !isNaN(parseInt(value));
}

export const isStringADate = (value: string): boolean => {
  return !isNaN(Date.parse(value.replace(regEx.dateTimeZoneChars, ' ')));
}

export const isStringBooleanOrNull = (value: string): boolean => {
  const permitted = ['true', 'false', 'null', 'nil', 'undefined'];
  return (permitted.includes(value.toLowerCase()));
}

export const isStringAURL = (value: string): boolean => {
  return !!value.replace(regEx.quotes, '').match(regEx.url);
}

export const isStorageAvailable = (): boolean => {
  let storage;
  try {
      storage = window['localStorage'];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return false;
  }
}

export const addToHistory = (
  config: ConfigData,
  data: DataData
): string => {
  const storage = window.localStorage;

  if (storage.length + 1 === 20) {
    let keys = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    const removeKey = keys.sort().shift();
    if (removeKey) {
      storage.removeItem(removeKey);
    }
  }
  const id = new Date().getTime().toString();
  const item = JSON.stringify({
    id,
    config,
    data,
  });
  console.log("adding, ", id, item);
  storage.setItem(id, item);
  return id;
}

export const getHistory = () => {
  if (!isStorageAvailable()) {
    return [];
  }
  const requestHistory = [] as HistoryEntry[];
  const storage = window.localStorage;
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!key) {
      break;
    }
    const data = storage.getItem(key);
    if (!data) {
      break;
    }
    requestHistory.push(JSON.parse(data));
  }
  return requestHistory.sort((a, b) => {
    const a_id = parseInt(a.id);
    const b_id = parseInt(b.id);
    return a_id > b_id ? -1 : a_id < b_id ? 1 : 0;
  });
}
