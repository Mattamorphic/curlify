/**
 * @file Proxy component
 * @author Mattamorphic
 */
import React from 'react';

import Checkbox from '../../../shared/Checkbox';
import Toggler from '../../../shared/Toggler';
import Input from '../../../shared/Input';
import Notice from '../../../shared/Notice';
import {InputTypes} from '../../../../enums';

import './css/Proxy.css'

import * as utils from '../../../../utils';

export interface ProxyData {
  url: string,
  isEnabled: boolean
}

interface ProxyProps {
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
      showProxySettings: true,
    };
  }

  toggleProxySettings = () => {
    this.setState(prevState => ({
      showProxySettings: !prevState.showProxySettings,
    }));
  }

  onUpdateProxyUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onUpdateProxy({
      url: e.target.value,
      isEnabled: this.props.proxy.isEnabled,
    })
  }

  onUpdateProxyEnabled = (isEnabled: boolean) => {
    this.props.onUpdateProxy({
      url: this.props.proxy.url,
      isEnabled
    })
  }

  render() {

    return (
      <Toggler
        isToggled={this.state.showProxySettings}
        className="Proxy"
        label="Proxy Settings"
        onToggle={this.toggleProxySettings}>
        <div className="row">
          <Notice
            className="twelve columns u-full-width"
            heading="Proxy Overview"
            content={"Requests are proxied through a copy of cors-anywhere\n"
              + `This is hosted on: ${utils.PROXY}${"\n"}`
              + "You can find the code for this at https://github.com/Mattamorphic/curlify/tree/proxy\n"
              + "If you'd like to use your own proxy, simply replace the URL\n"
              + "This should follow cors-anywhere entry design\n"
              + "This proxy forwards request, gets around the cors issue, and allows us to return headers\n"
              + "No data is recorded in the proxy\n"} />
        </div>
        <div className="row">
          <Input
            className="six columns u-full-width"
            isDisabled={!this.props.proxy.isEnabled}
            type={InputTypes.URL}
            onChange={this.onUpdateProxyUrl}
            placeholder="Proxy Url"
            value={this.props.proxy.url} />
          <Checkbox
            className="checkbox six columns u-full-width"
            isChecked={this.props.proxy.isEnabled}
            isCheckedLabel="Proxy is enabled"
            isNotCheckedLabel="Proxy is not enabled"
            onChange={this.onUpdateProxyEnabled}
            value="proxy" />
        </div>
      </Toggler>
    );
  }
}
