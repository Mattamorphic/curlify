/**
 * @file Utils
 * @author Mattamorphic
 */
import { ConfigData } from '../components/config/Config';
import { DataData } from '../components/data/Data';
import { HistoryEntry } from '../components/history/History';
import { HTTPMethods } from '../enums';
import { KeyValueEntry } from '../components/shared/KeyValueInput';
import { parse } from 'graphql';
import { ProxyData } from '../components/test/request/proxy/Proxy';

export interface ParsedURL {
  domain: string;
  endpoint: string;
  queryParams: KeyValueEntry[];
  rawUrl: string;
}

/**
 * Does the given method suppport a payload?
 *
 * @params {HTTPMethods} method
 *
 * @returns boolean
 */
export const methodHasPayload = (method: HTTPMethods): boolean =>
  ![HTTPMethods.GET, HTTPMethods.HEAD].includes(method);

// Proxy address
export const PROXY = 'https://curlify-proxy.herokuapp.com/';

// Common RegEx patterns used
export const regEx = {
  // Todo: convert to /gms https://github.com/babel/babel/pull/10347
  curlData: /(?:-d\s{0,}'|")({.*})(?=['|"])/gim,
  curlHeader: /(?:-H ")([\w\d]{1,})(?:\s{0,}:\s{0,})(.+?)(?=")/gim,
  curlMethod: /(?:-X\s{0,})(\w{3,6})/gim,
  dateTimeZoneChars: /[T|Z]/gim,
  jsonData: /^( *)("[^"]+": )?("[^"].*"|[\w.+-]*)?([{}[\],]*)?$/gm,
  multipleSpaces: / +/gm,
  newLine: /[\r|\n]/gm,
  newLineAndTab: /[\n|\r|\t]/gm,
  queryParams: /(\?.*)/g,
  quotes: /["']/gim,
  singleEscapedNewLine: /(?<!\\)\\n/gm,
  url: /^((?:http(?:s)?:\/\/)+[\w.-]+(?:.[\w.-]+))+([\w-._~:/?#[\]@!$&'()*+,;=.]+)$/gim
};

/**
 * Determine if the proxy has changed
 *
 * @params {ProxyData} prevProxy
 * @params {ProxyData} newProxy
 *
 * @returns {boolean}
 */
export const hasProxyChanged = (
  prevProxy: ProxyData,
  newProxy: ProxyData
): boolean => {
  return (
    prevProxy.isEnabled !== newProxy.isEnabled || prevProxy.url !== newProxy.url
  );
};

/**
 * Is the given string a HTTP method?
 *
 * @params {string} string
 *
 * @returns {boolean}
 */
export const isValidMethod = (string: string): boolean =>
  Object.values(HTTPMethods).includes(string);

/**
 * Does the domain / endpoint make a valid URL?
 *
 * @params {string} domain
 * @params {string} endpoin
 *
 * @returns {boolean}
 */
export const isValidURL = (domain: string, endpoint: string): boolean => {
  const url =
    domain +
    (domain.charAt(domain.length - 1) !== '/' && endpoint.charAt(0) !== '/'
      ? '/'
      : '') +
    endpoint;

  const possUrl = url.match(regEx.url);
  return !possUrl || possUrl[0] !== url ? false : true;
};

/**
 * Are the headers provided valid?
 *
 * @params {KeyValueEntry[]} headers
 *
 * @returns {boolean}
 */
export const isValidHeaders = (headers: KeyValueEntry[]): boolean => {
  return headers.reduce((_: boolean, curr: KeyValueEntry) => {
    return (
      curr.key !== null &&
      curr.key !== undefined &&
      typeof curr.key === 'string' &&
      curr.key !== ''
    );
  }, true);
};

/**
 * Is given string valid json?
 *
 * @params {string} json
 *
 * @returns {boolean}
 */
export const isValidJsonString = (json: string): boolean => {
  try {
    JSON.parse(json);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Is given string valid graphql?
 *
 * @params {string} gql
 *
 * @returns {boolean}
 */
export const isValidGraphQLString = (gql: string): boolean => {
  try {
    parse(gql);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Is given string a valid number?
 *
 * @params {string} value
 *
 * @returns {boolean}
 */
export const isStringANumber = (value: string): boolean => {
  return !isNaN(parseInt(value));
};

/**
 * Is given string a valid date?
 *
 * @params {string} value
 *
 * @returns {boolean}
 */
export const isStringADate = (value: string): boolean => {
  return !isNaN(Date.parse(value.replace(regEx.dateTimeZoneChars, ' ')));
};

/**
 * Is given string a nully value?
 *
 * @params {string} value
 *
 * @returns {boolean}
 */
export const isStringBooleanOrNull = (value: string): boolean => {
  const permitted = ['true', 'false', 'null', 'nil', 'undefined'];
  return permitted.includes(value.toLowerCase());
};

/**
 * Is given string a valid url?
 *
 * @params {string} value
 *
 * @returns {boolean}
 */
export const isStringAURL = (value: string): boolean => {
  return !!value.replace(regEx.quotes, '').match(regEx.url);
};

/**
 * Is local storage available?
 *
 * @returns {boolean}
 */
export const isStorageAvailable = (): boolean => {
  let storage;
  try {
    storage = window['localStorage'];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Add history item to local storage
 *
 * @params {ConfigData} config  Request Config
 * @params {DataData}   data    Request Data
 * @params {number}     status  Status code
 *
 * @returns {string}
 */
export const addToHistory = (
  config: ConfigData,
  data: DataData,
  status: number
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
    config,
    data,
    id,
    status
  });
  storage.setItem(id, item);
  return id;
};

/**
 * Fetch the history from local storage
 *
 * @returns {HistoryEntry[]}
 */
export const getHistory = (): HistoryEntry[] => {
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
    try {
      requestHistory.push(JSON.parse(data));
    } catch (_) {
      storage.removeItem(key);
    }
  }
  return requestHistory.sort((a, b) => {
    const a_id = parseInt(a.id);
    const b_id = parseInt(b.id);
    return a_id > b_id ? -1 : a_id < b_id ? 1 : 0;
  });
};

/**
 * Clear the local storage
 */
export const clearHistory = () => {
  window.localStorage.clear();
};

/**
 * Parse a URL into it's component parts
 *
 * @params {string} str Possible url
 *
 * @returns {ParsedURL}
 */
export const parseURLString = (str: string): ParsedURL => {
  const uri = new URL(str);
  const params = Object.fromEntries(new URLSearchParams(uri.search));
  let endpoint = uri.pathname;
  if (str.charAt(str.length - 1) === '?' && uri.search === '') {
    endpoint += '?';
  }
  return {
    domain: uri.origin,
    endpoint,
    queryParams: Object.keys(params).map(key => ({ key, value: params[key] })),
    rawUrl: uri.href
  };
};

/**
 * Is a nully value?
 *
 * @params {any} value
 *
 * @returns {boolean}
 */
export const isNull = (value: any): boolean => {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  return false;
};

/**
 * Convert an array to a query string
 *
 * @params {KeyValueEntry[]} qp
 *
 * @returns {string}
 */
export const convertKeyValueArrayToQueryParams = (
  qp: KeyValueEntry[]
): string => {
  if (qp.length === 0) {
    return '';
  }
  return (
    '?' +
    qp
      .map(p => {
        return p.key + (isNull(p.value) ? '' : '=' + p.value);
      })
      .join('&')
  );
};
