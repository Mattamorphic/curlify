/**
 * @file Proxy component
 * @author Mattamorphic
 */
import React from 'react';

import Checkbox from '../../../shared/Checkbox';
import Toggler from '../../../shared/Toggler';
import Input from '../../../shared/Input';
import Notice from '../../../shared/Notice';
import { InputTypes } from '../../../../enums';

import './css/Proxy.css';

import * as utils from '../../../../utils';

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

  onUpdateProxyUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onUpdateProxy({
      url: e.target.value,
      isEnabled: this.props.proxy.isEnabled
    });
  };

  onUpdateProxyEnabled = (isEnabled: boolean) => {
    this.props.onUpdateProxy({
      url: this.props.proxy.url,
      isEnabled
    });
  };

  render() {
    return (
      <Toggler
        isToggled={this.state.showProxySettings}
        className="Proxy"
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
            If you'd like to use your own proxy, simply replace the URL <br />
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
            type={InputTypes.URL}
            onChange={this.onUpdateProxyUrl}
            placeholder="Proxy Url"
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
