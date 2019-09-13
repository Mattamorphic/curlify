import './css/GraphQL.css';

import Button from '../../shared/Button';
import Copy from '../../shared/Copy';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gqlPayloadType } from '../Data';
import React from 'react';
import Saving from '../../shared/Saving';
import TextArea from '../../shared/TextArea';
import Tooltip from '../../shared/Tooltip';
import Type from './type/Type';

import { OperationDefinitionNode, parse, print } from 'graphql';

export enum GraphQLType {
  QUERY = 'query',
  MUTATION = 'mutation'
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

export default class GraphQL extends React.PureComponent<
  GraphQLProps,
  GraphQLState
> {
  constructor(props: GraphQLProps) {
    super(props);
    const gql = GraphQL.getDocAndTypeFromGQLString(props.data.query);
    this.state = {
      draft: gql.gql,
      isSaved: true,
      type: gql.type
    };
  }

  static getDocAndTypeFromGQLString(gql: string): ParsedGQL {
    const doc = parse(gql);
    const def: OperationDefinitionNode = doc
      .definitions[0] as OperationDefinitionNode;
    const type = def.operation as GraphQLType;
    return {
      gql: print(doc),
      type
    };
  }

  static getDerivedStateFromProps(
    newProps: GraphQLProps,
    state: GraphQLState
  ): GraphQLState {
    if (newProps.data.query !== state.draft && !state.isSaved) {
      return state;
    }
    try {
      const gql = GraphQL.getDocAndTypeFromGQLString(newProps.data.query);
      return {
        draft: newProps.data.query,
        isSaved: true,
        type: gql.type
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
          { query: draft }
        );
        this.setState({ isSaved: true });
      } else {
        this.setState({
          draft,
          isSaved: false
        });
      }
    } catch (_) {
      this.setState({
        draft,
        isSaved: false
      });
    }
  };

  updateType = (type: GraphQLType): void => {
    this.props.onUpdateData({
      query: type + ' ' + this.state.draft.replace(this.state.type, '')
    });
  };

  pretty = () => {
    this.props.onUpdateData({
      query:
        this.state.type +
        ' ' +
        GraphQL.PrettyMe(this.state.draft).replace(this.state.type, '')
    });
  };

  static PrettyMe(gql: string): string {
    try {
      return print(parse(gql));
    } catch (_) {
      // Todo: print errors
      return gql;
    }
  }

  render() {
    return (
      <div className="GraphQL">
        <div className="row">
          <TextArea
            isFullWidth={true}
            onChangeDirect={this.updateGraphQL}
            style={{
              background: `url('${process.env.PUBLIC_URL}/images/textarea.png')`,
              backgroundAttachment: 'local',
              backgroundColor: '#19404A',
              backgroundRepeat: 'no-repeat',
              color: '#EEE8D5'
            }}
            value={this.state.draft}
          />
        </div>
        <div className="row">
          <div className="two columns">
            <Saving isSaved={this.state.isSaved} />
          </div>
          <div className="two columns">
            <Type
              className="u-full-width"
              onUpdate={this.updateType}
              selected={this.state.type}
            />
          </div>
          <div className="two columns">
            <Tooltip text="Pretty payload">
              <Button
                className="u-full-width GraphQLPretty"
                isDisabled={!this.state.isSaved}
                isPrimary={false}
                onClick={this.pretty}
              >
                <FontAwesomeIcon icon={faMagic} size="lg" />
              </Button>
            </Tooltip>
          </div>
          <div className="two columns">
            <Copy
              className="u-pull-right"
              content={GraphQL.PrettyMe(this.state.draft)}
            />
          </div>
        </div>
      </div>
    );
  }
}
