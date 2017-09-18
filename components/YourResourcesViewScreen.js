import React from "react";
import { Alert, RefreshControl, View } from "react-native";
import {
  ActionSheet,
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
import { Link } from "react-router-native";
import { graphql, gql } from "react-apollo";
import _ from "lodash";

const styles = {
  tag: {
    color: "#aaa"
  },
  container: {
    backgroundColor: "#FFF"
  }
};

const MY_RESOURCES_QUERY = gql`
  query YourResourcesQuery {
    allUsers {
      resourcesCreated {
        id
        name
        tags {
          id
          label
        }
      }
    }
  }
`;

var BUTTONS = ["Create Resource", "Find Resource", "Cancel"];
var CANCEL_INDEX = 2;

class YourResourcesViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: true
    };
  }
  componentDidMount() {
    this.onRefresh();
  }
  onRefresh() {
    if (this.state.refreshing) {
      return;
    }
    this.setState({ refreshing: true });
    this.props.yourResourcesQuery
      .refetch()
      .then(() => {
        this.setState({ refreshing: false });
      })
      .catch(e => {
        Toast.show({
          text: e.message,
          //text: 'We could not fetch your resources. Are you connected to the internet? ',
          type: "danger",
          position: "bottom",
          buttonText: "Okay"
        });
        this.setState({ refreshing: false });
      });
  }
  render() {
    const { yourResourcesQuery, navigation } = this.props;
    const { refreshing } = this.state;
    const { loading, allUsers } = yourResourcesQuery;
    const hasResults = !!allUsers;

    // if (this.props.yourResourcesQuery && this.props.yourResourcesQuery.error) {
    //   return (
    //     <View>
    //       <Text>Error</Text>
    //     </View>
    //   );
    // }

    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body style={{ flexGrow: 2 }}>
            <Title>Your Resources</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: "Add Resource"
                },
                buttonIndex => {
                  // this.setState({ clicked: BUTTONS[buttonIndex] });
                  switch (buttonIndex) {
                    case 0:
                      this.props.history.push(`/app/resources/your/add`);
                      break;
                    default:
                      return;
                  }
                }
              )
            }}><Text>Add</Text></Button>
          </Right>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          {loading
            ? null
            : <List
                dataArray={_.get(
                  yourResourcesQuery,
                  "allUsers[0].resourcesCreated",
                  []
                )}
                renderRow={resource =>
                  <ListItem
                    onPress={() => {
                      this.props.history.push(
                        `/app/resources/your/view/${resource.id}`
                      );
                    }}
                  >
                    <Body>
                      <View>
                        <Text>
                          {resource.name}
                        </Text>
                      </View>
                      <View>
                        {resource.tags.map(tag =>
                          <Text key={tag.id} style={styles.tag}>
                            {tag.label}
                          </Text>
                        )}
                      </View>
                    </Body>
                  </ListItem>}
              />}
        </Content>
      </Container>
    );
  }
}

export default graphql(MY_RESOURCES_QUERY, {
  name: "yourResourcesQuery",
  options: {
    fetchPolicy: "cache-and-network"
  }
})(YourResourcesViewScreen);
