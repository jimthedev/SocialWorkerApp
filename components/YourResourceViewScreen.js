import React from "react";
import { Alert, RefreshControl, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Toast,
  Spinner,
  Left,
  Body,
  Right
} from "native-base";
import _ from "lodash";

import { Link, withRouter } from "react-router-native";
import { graphql, gql } from "react-apollo";

const styles = {
  tag: {
    color: "#aaa"
  },
  container: {
    backgroundColor: "#FFF"
  }
};

const MY_RESOURCE_QUERY = gql`
  query YourResourceQuery($resourceId: ID!) {
    allResources(filter: { id: $resourceId }) {
      id
      name
      tags {
        id
        label
      }
    }
  }
`;

const DELETE_RESOURCE_MUTATION = gql`
  mutation deleteResource($deleteResourceId: ID!) {
    deleteResource(id: $deleteResourceId) {
      id
    }
  }
`;

const DeleteResourceButton = ({ deleteResource, id, history }) =>
  <Button
    onPress={() => {
      deleteResource({ id }).then(() => {
        history.goBack();
      });
    }}
  >
    <Text>Delete</Text>
  </Button>;

const MockDeleteButton = withRouter(
  graphql(DELETE_RESOURCE_MUTATION, {
    props: ({ mutate }) => ({
      deleteResource: ({ id }) =>
        mutate({
          variables: {
            deleteResourceId: id
          }
        })
    })
  })(DeleteResourceButton)
);

class YourResourceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      editing: false,
      refreshing: false
    };
  }
  onRefresh() {
    this.setState({ refreshing: true });
    this.props.yourResourceQuery
      .refetch()
      .then(() => {
        this.setState({ refreshing: false });
      })
      .catch(e => {
        Toast.show({
          text:
            "We could not fetch your resources. Are you connected to the internet?",
          type: "danger",
          position: "bottom",
          buttonText: "Okay"
        });
        this.setState({ refreshing: false });
      });
  }
  render() {
    // const { navigate, goBack } = this.props.navigation;
    // goBack
    const { yourResourceQuery } = this.props;
    const { editing } = this.state;
    const loading = yourResourceQuery.loading;
    const hasResults = !!yourResourceQuery.allResources;

    // if (this.props.yourResourceQuery && this.props.yourResourceQuery.error) {
    //   return (
    //     <View>
    //       <Text>Error</Text>
    //     </View>
    //   );
    // }

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            {editing
              ? <Button
                  transparent
                  onPress={() => {
                    this.setState({ editing: false });
                  }}
                >
                  <Text>Cancel</Text>
                </Button>
              : <Button
                  transparent
                  onPress={() => {
                    this.props.history.goBack();
                  }}
                >
                  <Icon name="ios-arrow-back-outline" />
                </Button>}
          </Left>
          <Body style={{flexGrow: 2}}>
            <Title>{_.get(yourResourceQuery, 'allResources[0].name', '')}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.setState({ editing: !editing });
              }}
            >
              <Text>
                {editing ? "Done" : "Edit"}
              </Text>
            </Button>
          </Right>
        </Header>
        <Content
        // refreshControl={
        // <RefreshControl
        //   refreshing={this.state.refreshing || loading}
        //   onRefresh={this.onRefresh.bind(this)}
        // />
        // }
        >
          <View>
            <Text>Yo</Text>
            <Link to="/app/resources/your">
              <Text>Back to Your Resources</Text>
            </Link>
          </View>
          {loading || !hasResults
            ? null
            : <View style={{ marginTop: 20 }}>
                <MockDeleteButton id={yourResourceQuery.allResources[0].id} />
                <Text>
                  {yourResourceQuery.allResources[0].id}
                  {yourResourceQuery.allResources[0].name}
                </Text>
                {yourResourceQuery.allResources[0].tags.map(tag =>
                  <Text key={tag.id} style={styles.tag}>
                    {tag.label}
                  </Text>
                )}
              </View>}
        </Content>
      </Container>
    );
  }
}

const YourResourceViewScreen = withRouter(
  graphql(MY_RESOURCE_QUERY, {
    name: "yourResourceQuery",
    options: props => {
      return {
        variables: {
          resourceId: props.id
        }
      };
    }
  })(YourResourceView)
);

export default class extends React.Component {
  render() {
    const props = this.props;
    const { id } = this.props.match.params;
    // const { goBack } = this.props.navigation;
    // goBack={goBack}
    return <YourResourceViewScreen id={id} />;
  }
}
