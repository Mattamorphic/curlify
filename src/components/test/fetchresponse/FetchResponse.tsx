import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Toggler from '../../shared/Toggler';

import * as utils from '../../../utils';

import {JsonValueTypes} from '../../../enums';

import './css/FetchResponse.css';

interface FetchResponseProps {
  headers: Headers,
  json: {[key: string]: any};
}

interface FetchResponseState {
  showHeaders: boolean;
  showData: boolean;
}

export default class FetchResponse extends React.PureComponent<FetchResponseProps, FetchResponseState> {

  constructor(props: FetchResponseProps) {
    super(props)
    this.state ={
      showHeaders: false,
      showData: false,
    };
  }


  replacer = (_: string, p1: string, p2: string, p3: string, p4: string) => {
    const part = { indent: p1, key: p2, value: p3, end: p4 };

    let valueClass = "json-value";
    let type = JsonValueTypes.STRING;
    if (part.value !== undefined && part.value !== null) {
      if (!isNaN(parseInt(part.value))) {
        valueClass = "json-number";
        type = JsonValueTypes.NUMBER;
      } else if (!isNaN(Date.parse(part.value.replace(/[T|Z]/, ' ')))) {
        valueClass = "json-date";
        type = JsonValueTypes.DATE;
      } else if (['true', 'false', 'null', 'nil', 'undefined'].includes(part.value.toLowerCase())) {
        valueClass = "json-boolean";
        type = JsonValueTypes.BOOLEAN;
      } else if (part.value.match(utils.regEx.url)) {
        valueClass = "json-url";
        type = JsonValueTypes.URL;
      } else {
        valueClass = "json-string";
        type = JsonValueTypes.STRING;
      }
    }
    return ReactDOMServer.renderToString(
      <>
        {"\u00a0".repeat(part.indent.length)}
        {part.key && <span className="json-key"> {part.key} </span>}
        {
          part.value
          &&
            <span className={valueClass}>
              {
                type === JsonValueTypes.URL
                  ? (<a href={part.value.replace(/"/, '')}>{part.value}</a>)
                  : part.value
              }
            </span>
        }
        {part.end && <span className="json-key"> {part.end} </span>}
        <br />
      </>
    );
  }

  toggleHeaders = () => {
    this.setState(prevState =>({
      showHeaders: !prevState.showHeaders,
    }))
  }

  toggleData = () => {
    this.setState(prevState =>({
      showData: !prevState.showData,
    }))
  }

  render () {
    return (
      <div className="FetchResponse">
      <Toggler
        isToggled={this.state.showHeaders}
        className="Headers"
        label="Headers"
        onToggle={this.toggleHeaders}>
        <table className="u-max-full-width">
          <thead>
            <tr>
              <th> Header </th>
              <th> Value </th>
            </tr>
          </thead>
          <tbody>
            {
              Array.from(this.props.headers.keys()).map(
                (key, index) => (
                  <tr key={`r_${key}_${index}`}>
                    <td> {key} </td>
                    <td> {this.props.headers.get(key)} </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </Toggler>
      <Toggler
        isToggled={this.state.showData}
        label="Data"
        onToggle={this.toggleData}>
          <div className="Data" dangerouslySetInnerHTML={{__html:
            JSON.stringify(
              this.props.json,
              null,
              3
            ).replace(
              /^( *)("[^"]+": )?("[^"].*"|[\w.+-]*)?([{}[\],]*)?$/mg,
              this.replacer
            )
        }} />
      </Toggler>
    </div>
    );
  }
}