import React from 'react';
import {parse, print, OperationDefinitionNode} from 'graphql';

import Button from '../../shared/Button';
import Copy from '../../shared/Copy';
import Saving from '../../shared/Saving';
import TextArea from '../../shared/TextArea';
import Type from './type/Type';

import './css/GraphQL.css';

import {gqlPayloadType} from '../Data';

export enum GraphQLType {
  QUERY = 'query',
  MUTATION = 'mutation',
}

interface ParsedGQL {
  gql: string;
  type: GraphQLType;
}

interface GraphQLProps {
  data: gqlPayloadType;
  onUpdateData: (value: gqlPayloadType) => void;
}

interface GraphQLState {
  draft: string;
  isSaved: boolean;
  type: GraphQLType;
}

export default class GraphQL extends React.PureComponent<GraphQLProps, GraphQLState> {

  constructor(props: GraphQLProps) {
    super(props);
    const gql = GraphQL.getDocAndTypeFromGQLString(props.data.query);
    this.state = {
      draft: gql.gql,
      isSaved: true,
      type: gql.type,
    }
  }

  static getDocAndTypeFromGQLString(
    gql: string
  ): ParsedGQL {
    const doc = parse(gql);
    const def: OperationDefinitionNode = doc.definitions[0] as OperationDefinitionNode;
    const type = def.operation as GraphQLType;
    return {
      gql: print(doc),
      type
    };
  }

  static getDerivedStateFromProps(newProps: GraphQLProps, state: GraphQLState): GraphQLState {
    if (newProps.data.query !== state.draft && !state.isSaved) {
      return state;
    }
    try {
      const gql = GraphQL.getDocAndTypeFromGQLString(newProps.data.query);
      return {
        draft: newProps.data.query,
        isSaved: true,
        type: gql.type,
      };

    } catch (e) {
      return state;
    }
  }

  updateGraphQL = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const draft = e.target.value;
    try {
      const gql = GraphQL.getDocAndTypeFromGQLString(draft);
      if (gql.gql !== this.state.draft) {
        this.props.onUpdateData(
          // replace any existing operation with an empty string
          {query: draft}
        );
        this.setState({isSaved: true});
      } else {
        this.setState({
          draft,
          isSaved:false,
        });
      }
    } catch (_) {
      this.setState({
        draft,
        isSaved: false,
      });
    }


  }

  updateType = (type: GraphQLType): void => {
    this.props.onUpdateData(
      {query: type +  ' ' + this.state.draft.replace(this.state.type, '')},
    );
  }

  pretty = () => {
    this.props.onUpdateData(
      {query: this.state.type + ' ' + GraphQL.PrettyMe(this.state.draft).replace(this.state.type, '')},
    );
  }

  static PrettyMe(gql: string): string {
    try {
      return print(parse(gql));
    } catch (_) {
      return gql;
    }
  }

  render() {
    return (
      <div className="GraphQL">
        <div className="row">
          <div className="six columns">
            <Saving isSaved={this.state.isSaved} label="GraphQL" />
          </div>
          <div className="two columns">
            <Type
              className="u-full-width"
              selected={this.state.type}
              onUpdate={this.updateType} />
          </div>
          <div className="two columns">
            <Button
              className="u-full-width"
              label="Pretty"
              onClick={this.pretty}
              isDisabled={!this.state.isSaved}
              isPrimary={false} />
          </div>
          <div className="two columns">
            <Copy
              className="u-pull-right"
              content={GraphQL.PrettyMe(this.state.draft)}
              label={`Copy GQL data` } />
          </div>
        </div>
        <div className="row">
          <TextArea
            isFullWidth={true}
            onChangeDirect={this.updateGraphQL}
            ref="input_gql"
            value={this.state.draft} />
        </div>
      </div>
    );
  }
}
