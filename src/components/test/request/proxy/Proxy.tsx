/**
 * @file Proxy component
 * @author Mattamorphic
 */

import './css/Proxy.css';

import * as utils from '../../../../utils';

import Checkbox from '../../../shared/Checkbox';
import Input from '../../../shared/Input';
import { InputTypes } from '../../../../enums';
import Notice from '../../../shared/Notice';
import React from 'react';
import Toggler from '../../../shared/Toggler';

export interface ProxyData {
  url: string;
  isEnabled: boolean;
}

interface ProxyProps {
  isExpanded: boolean;
  proxy: ProxyData;
  onUpdateProxy: (data: ProxyData) => void;
}

interface ProxyState {
  showProxySettings: boolean;
}

export default class Proxy extends React.PureComponent<ProxyProps, ProxyState> {
  constructor(props: ProxyProps) {
    super(props);
    this.state = {
      showProxySettings: props.isExpanded
    };
  }

  toggleProxySettings = () => {
    this.setState(prevState => ({
      showProxySettings: !prevState.showProxySettings
    }));
  };

  onUpdateProxyUrl = (url: string) => {
    this.props.onUpdateProxy({
      isEnabled: this.props.proxy.isEnabled,
      url
    });
  };

  onUpdateProxyEnabled = (isEnabled: boolean) => {
    this.props.onUpdateProxy({
      isEnabled,
      url: this.props.proxy.url
    });
  };

  render() {
    return (
      <Toggler
        className="Proxy"
        isToggled={this.state.showProxySettings}
        label="Proxy Settings"
        onToggle={this.toggleProxySettings}
      >
        <div className="row">
          <Notice
            className="twelve columns u-full-width"
            heading="Proxy Overview"
          >
            Requests are proxied through a copy of cors-anywhere <br />
            This is hosted on: <a href={utils.PROXY}>{utils.PROXY}</a> <br />
            You can find the code for this at{' '}
            <a href="https://github.com/Mattamorphic/curlify/tree/proxy">
              GitHub
            </a>{' '}
            <br />
            If you&apos;d like to use your own proxy, simply replace the URL{' '}
            <br />
            This should follow cors-anywhere entry design <br />
            This proxy forwards request, gets around the cors issue, and allows
            us to return headers <br />
            No data is recorded in the proxy
          </Notice>
        </div>
        <div className="row">
          <Input
            className="six columns u-full-width"
            isDisabled={!this.props.proxy.isEnabled}
            onChange={this.onUpdateProxyUrl}
            placeholder="Proxy Url"
            type={InputTypes.URL}
            value={this.props.proxy.url}
          />
          <Checkbox
            className="checkbox six columns u-full-width"
            isChecked={this.props.proxy.isEnabled}
            isCheckedLabel="Proxy is enabled"
            isNotCheckedLabel="Proxy is not enabled"
            onChange={this.onUpdateProxyEnabled}
            value="proxy"
          />
        </div>
      </Toggler>
    );
  }
}
