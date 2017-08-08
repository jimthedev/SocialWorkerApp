import React from "react";
import { RefreshControl, View } from "react-native";
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
import { graphql, gql } from "react-apollo";

const styles = {
  tag: {
    color: "#aaa"
  },
  container: {
    backgroundColor: "#FFF"
  }
};

const MY_RESOURCES_QUERY = gql`
  query MyResourcesQuery {
    allUsers {
      resourcesCreated {
        name
        tags {
          id
          label
        }
      }
    }
  }
`;

class MyResourcesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: "My Resources",
    headerLeft: null,
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name={focused ? "ios-pin" : "ios-pin-outline"}
        style={{ color: tintColor }}
      />
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }
  onRefresh() {
    this.setState({ refreshing: true });
    this.props.myResourcesQuery.refetch()
      .then(() => {
        this.setState({ refreshing: false });
      }).catch((e) => {
        Toast.show({
          text: 'We could not fetch your resources. Are you connected to the internet?',
          type: 'danger',
          position: 'bottom',
          buttonText: 'Okay'
        });
        this.setState({ refreshing: false });
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { myResourcesQuery } = this.props;

    const loading = false || myResourcesQuery.loading;

    // if (this.props.myResourcesQuery && this.props.myResourcesQuery.error) {
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
          <Body>
            <Title>Resources</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {

            }}>
              <Icon name="ios-add-outline" />
            </Button>
          </Right>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing || loading }
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          { loading ? null : <List
            dataArray={myResourcesQuery.allUsers[0].resourcesCreated}
            renderRow={resource =>
              <ListItem>
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

export default graphql(MY_RESOURCES_QUERY, { name: "myResourcesQuery" })(
  MyResourcesScreen
);
