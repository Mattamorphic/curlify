/**
 * @file ResponseJson component
 * @author Mattamorphic
 */
import './css/ResponseJson.css';

import * as utils from '../../../../utils';

import { JsonValueTypes } from '../../../../enums';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Toggler from '../../../shared/Toggler';

interface ResponseJsonProps {
  data: { [key: string]: any };
}

interface ResponseJsonState {
  response: string;
  showJson: boolean;
}

export default class ResponseJson extends React.PureComponent<
  ResponseJsonProps,
  ResponseJsonState
> {
  constructor(props: ResponseJsonProps) {
    super(props);
    this.state = {
      response: JSON.stringify(props.data, null, 3).replace(
        utils.regEx.jsonData,
        this.replacer
      ),
      showJson: false
    };
  }

  toggleJson = () => {
    this.setState(prevState => ({
      showJson: !prevState.showJson
    }));
  };

  replacer = (_: string, p1: string, p2: string, p3: string, p4: string) => {
    const part = { end: p4, indent: p1, key: p2, value: p3 };

    let valueClass = 'json-value';
    let type = JsonValueTypes.STRING;
    if (part.value !== undefined && part.value !== null) {
      if (utils.isStringANumber(part.value)) {
        valueClass = 'json-number';
        type = JsonValueTypes.NUMBER;
      } else if (utils.isStringADate(part.value)) {
        valueClass = 'json-date';
        type = JsonValueTypes.DATE;
      } else if (utils.isStringBooleanOrNull(part.value)) {
        valueClass = 'json-boolean';
        type = JsonValueTypes.BOOLEAN;
      } else if (utils.isStringAURL(part.value)) {
        valueClass = 'json-url';
        type = JsonValueTypes.URL;
      } else {
        valueClass = 'json-string';
        type = JsonValueTypes.STRING;
      }
    }
    return ReactDOMServer.renderToString(
      <>
        {'\u00a0'.repeat(part.indent.length)}
        {part.key && <span className="json-key"> {part.key} </span>}
        {part.value && (
          <span className={valueClass}>
            {type === JsonValueTypes.URL ? (
              <a href={part.value.replace(utils.regEx.quotes, '')}>
                {part.value}
              </a>
            ) : (
              part.value
            )}
          </span>
        )}
        {part.end && <span className="json-key"> {part.end} </span>}
        <br />
      </>
    );
  };

  render() {
    return (
      <Toggler
        isToggled={this.state.showJson}
        label="Data"
        onToggle={this.toggleJson}
      >
        <div
          className="ResponseJson"
          dangerouslySetInnerHTML={{
            __html: this.state.response
          }}
        />
      </Toggler>
    );
  }
}
