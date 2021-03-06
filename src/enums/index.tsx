export enum HTTPMethods {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT'
}

export enum HTTPHeaders {
  'A-IM' = 'A-IM',
  Accept = 'Accept',
  'Accept-Charset' = 'Accept-Charset',
  'Accept-Datetime' = 'Accept-Datetime',
  'Accept-Encoding' = 'Accept-Encoding',
  'Accept-Language' = 'Accept-Language',
  'Access-Control-Request-Method' = 'Access-Control-Request-Method',
  'Access-Control-Request-Headers' = 'Access-Control-Request-Headers',
  Authorization = 'Authorization',
  Authentication = 'Authentication',
  'Cache-Control' = 'Cache-Control',
  'Content-Length' = 'Content-Length',
  'Content-MD5' = 'Content-MD5',
  'Content-Type' = 'Content-Type',
  Cookie = 'Cookie',
  Date = 'Date',
  Expect = 'Expect',
  Forwarded = 'Forwarded',
  From = 'From',
  Host = 'Host',
  'HTTP2-Settings' = 'HTTP2-Settings',
  'If-Match' = 'If-Match',
  'If-Modified-Since' = 'If-Modified-Since',
  'If-None-Match' = 'If-None-Match',
  'If-Range' = 'If-Range',
  'If-Unmodified-Since' = 'If-Unmodified-Since',
  'Max-Forwards' = 'Max-Forwards',
  Pragma = 'Pragma',
  'Proxy-Authorization' = 'Proxy-Authorization',
  Range = 'Range',
  Referer = 'Referer',
  TE = 'TE',
  Upgrade = 'Upgrade',
  'User-Agent' = 'User-Agent',
  Via = 'Via',
  Warning = 'Warning'
}

export enum DataType {
  FORM = 'form',
  JSON = 'json',
  GQL = 'graphQL'
}

export enum OutputType {
  CURL = 'curl'
}

export enum InputTypes {
  BUTTON = 'button',
  CHECKBOX = 'checkbox',
  COLOR = 'color',
  DATE = 'date',
  DATETIME_LOCAL = 'datetime-local',
  EMAIL = 'email',
  FILE = 'file',
  HIDDEN = 'hidden',
  IMAGE = 'image',
  MONTH = 'month',
  NUMBER = 'number',
  PASSWORD = 'password',
  RADIO = 'radio',
  RANGE = 'range',
  RESET = 'reset',
  SEARCH = 'search',
  SUBMIT = 'submit',
  TEL = 'tel',
  TEXT = 'text',
  TIME = 'time',
  URL = 'url',
  WEEK = 'week'
}

export enum ColumnCount {
  ONE = 'one column',
  TWO = 'two columns',
  THREE = 'three columns',
  FOUR = 'four columns',
  FIVE = 'five columns',
  SIX = 'six columns',
  SEVEN = 'seven columns',
  EIGHT = 'eight columns',
  NINE = 'nine columns',
  TEN = 'ten columns',
  ELEVEN = 'eleven columns',
  TWELVE = 'twelve columns'
}

export enum JsonValueTypes {
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  URL = 'url',
  STRING = 'string'
}
