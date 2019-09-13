/**
 * @file Autocomplete component
 * @author Mattamorphic
 */

import './css/Autocomplete.css';

import React from 'react';

interface AutocompleteProps {
  className?: string;
  name?: string;
  placeholder?: string;
  suggestions: string[];
  onSelectSuggestion: (value: string, name?: string) => void;
  selected: string;
}

interface AutocompleteState {
  activeSuggestion: number;
  filteredSuggestions: string[];
  showSuggestions: boolean;
  userInput: string;
}

export default class Autocomplete extends React.PureComponent<
  AutocompleteProps,
  AutocompleteState
> {
  constructor(props: AutocompleteProps) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: props.selected
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = [userInput].concat(
      this.props.suggestions.filter(suggestion => {
        suggestion = suggestion.toLowerCase();
        const input = userInput.toLowerCase();
        return suggestion.indexOf(input) > -1 && suggestion !== input;
      })
    );
    this.setState({
      filteredSuggestions,
      showSuggestions: true,
      userInput
    });
  };
  // onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {}
  onSuggestionMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const userInput = e.currentTarget.innerText;
    this.setState({ userInput }, () =>
      this.props.onSelectSuggestion(userInput, this.props.name)
    );
  };

  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const userInput = e.currentTarget.value;
    this.setState({ userInput }, () =>
      this.props.onSelectSuggestion(userInput, this.props.name)
    );
  };

  render() {
    return (
      <div className={(this.props.className || '') + ' Autocomplete'}>
        <input
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder={this.props.placeholder || ''}
          type="text"
          value={this.state.userInput}
        />
        <div className="AutocompleteList">
          {this.state.showSuggestions && this.state.userInput && (
            <div className="AutocompleteResults">
              {this.state.filteredSuggestions.length && (
                <ul className="AutocompleteResultsList">
                  {this.state.filteredSuggestions.map(
                    (suggestion: string, index: number) => (
                      <li
                        key={index + '_' + suggestion}
                        onMouseDown={this.onSuggestionMouseDown}
                      >
                        {suggestion}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
