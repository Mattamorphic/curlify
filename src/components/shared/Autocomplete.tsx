/**
 * @file Autocomplete component
 * @author Mattamorphic
 */

import './css/Autocomplete.css';

import React from 'react';

interface AutocompleteProps {
  className?: string;
  suggestions: string[];
  onSelectSuggestion: (value: string) => void;
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
    this.props.onSelectSuggestion(e.currentTarget.innerText);
  };

  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.onSelectSuggestion(e.currentTarget.value);
  };

  render() {
    return (
      <div className={(this.props.className || '') + ' Autocomplete'}>
        <input
          onChange={this.onChange}
          onBlur={this.onBlur}
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
