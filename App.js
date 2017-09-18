import React from "react";
import {
  Alert,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

import { NativeRouter, Redirect, Route, Link, withRouter } from "react-router-native";

import {
  Body,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Button,
  Icon,
  Root,
  Toast
} from "native-base"; // For Toast component

import LogInScreen from "./components/LogInScreen";
import SignUpScreen from "./components/SignUpScreen";
import YourResourcesAddScreen from "./components/YourResourcesAddScreen";
import YourResourcesViewScreen from "./components/YourResourcesViewScreen";
import YourResourceViewScreen from "./components/YourResourceViewScreen";

import {
  ApolloProvider,
  createNetworkInterface,
} from "react-apollo";

// Imported 1.8.0 until resolved: https://github.com/apollographql/react-apollo/issues/61
import ApolloClient from 'apollo-client';


// NETWORK
const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj5j28ocpc73v0122wya21dbq"
});
const client = new ApolloClient({
  networkInterface
});

const styles = {
  disabledTab: {
    // borderLeftColor: "#ccc",
    // borderLeftWidth: 4
  },
  activeTab: {
    // borderLeftColor: "#fc0",
    // borderLeftWidth: 4
  },
  tab: {
    flex:1,
    alignSelf:'stretch',
    justifyContent:'center'
  }
};
class TabList extends React.Component {
  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === this.props.activeIndex,
        onPress: () => {
          this.props.onActivate(index);
        }
      });
    });

    return (
      <Footer style={styles.tabs}>
        {children}
      </Footer>
    );
  }
}


class Tab extends React.Component {
  render() {
    const {route, label} = this.props;
    return (
      <FooterTab>
        <Link to={route} underlayColor="transparent" style={{flex:1}}>
          <View style={{flex:1}}>
            {this.props.children}
          </View>
        </Link>
      </FooterTab>
    );
  }
}

class TabPanels extends React.Component {
  render() {
    return (
      <Container style={styles.tabPanels}>
        {this.props.children}
      </Container>
    );
  }
}

class TabPanel extends React.Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: !!props.initialIndex ? props.initialIndex : 0
    };
  }

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      if (child.type === TabPanels) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex
        });
      } else if (child.type === TabList) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex,
          onActivate: activeIndex => this.setState({ activeIndex })
        });
      } else {
        return child;
      }
    });

    return (
      <Container>
        {children}
      </Container>
    );
  }
}

const RouteMatch = () => (
  <View><Text>Matched route</Text></View>
)

const FeedPanel = (props) => (
  <TabPanel>
    <Container>
      <Header>
        <Body>
          <Text>Feed</Text>
        </Body>
      </Header>
      <Content style={{
        backgroundColor: '#fc0'
      }}>
        <View style={{flex:1}}>
          <Text>Feed text is ac</Text>
          <Link to="/app/profile"><Text>Profile</Text></Link>
        </View>
      </Content>
    </Container>
  </TabPanel>
)

const AddResourceScreen = (props) => (
  <Container>
    <Header>
      <Body>
        <Text>Add Resource</Text>
      </Body>
    </Header>
    <Content style={{
      backgroundColor: '#fe6'
    }}>
      <View style={{flex:1}}>
        <Text>Add Resources text is ac</Text>
        <Route path="/app/resources" component={RouteMatch} />
        <Link to="/app/resources/your"><Text>Your Resources</Text></Link>
        <Button onPress={() => {props.history.goBack()}}><Text>Back</Text></Button>
      </View>
    </Content>
  </Container>
)

const ResourcesPanel = (props) => (
  <TabPanel>
    <Route path="/app/resources/your" exact render={(props) => (
      <YourResourcesViewScreen {...props} />
    )}/>
    <Route path="/app/resources/your/add" exact component={YourResourcesAddScreen} />
    <Route path="/app/resources/your/view/:id" exact component={YourResourceViewScreen} />
  </TabPanel>
)

const EducationPanel = (props) => (
  <TabPanel>
    <Container>
      <Header>
        <Body>
          <Text>CEUs</Text>
        </Body>
      </Header>
      <Content style={{
        backgroundColor: '#0fc'
      }}>
        <View style={{flex:1}}>
          <Text>CEU text is ac</Text>
        </View>
      </Content>
    </Container>
  </TabPanel>
)

const ProfilePanel = (props) => (
  <TabPanel>
    <Container>
      <Header>
        <Body>
          <Text>Profile</Text>
        </Body>
      </Header>
      <Content style={{
        backgroundColor: '#f0c'
      }}>
        <View style={{flex:1}}>
          <Link to="/log-out"><Text>Log out</Text></Link>
          <Text>Profile text is cc</Text>
        </View>
      </Content>
    </Container>
  </TabPanel>
)

const DataTabs = (props) => {
  return (
    <Tabs initialIndex="0">
      <TabPanels>
        <Route path="/app/feed" render={(props) => (
          <FeedPanel {...props} />
        )}/>
        <Route path="/app/resources" render={(props) => (
          <ResourcesPanel {...props} />
        )}/>
        <Route path="/app/education" render={(props) => (
          <EducationPanel {...props} />
        )}/>
        <Route path="/app/profile" render={(props) => (
          <ProfilePanel {...props} />
        )}/>
      </TabPanels>
      <TabList>
        <Tab route="/app/feed" label="Feed">
          <Route path={'/app/feed'}>
            {({ match }) => (
              <Container style={styles.tab}>
                <Icon name='home' active={!!match} style={{textAlign:'center'}} />
                <Text style={{ fontSize: 9, textAlign:'center'}}>Feed</Text>
              </Container>
            )}
          </Route>
        </Tab>
        <Tab route="/app/resources/your" label="Resources">
          <Route path={'/app/resources'}>
            {({ match, history }) => (
              <Container style={styles.tab}>
                <Icon name="pin" active={!!match} style={{textAlign:'center'}} />
                <Text style={{ fontSize: 9, textAlign:'center'}}>Resources</Text>
              </Container>
            )}
          </Route>
        </Tab>
        <Tab route="/app/education" label="Education">
          <Route path={'/app/education'}>
            {({ match }) => (
              <Container style={styles.tab}>
                <Icon name="school" active={!!match} style={{textAlign:'center'}} />
                <Text style={{ fontSize: 9, textAlign:'center'}}>CEUs</Text>
              </Container>
            )}
          </Route>
        </Tab>
        <Tab route="/app/profile" label="Profile">
          <Route path={'/app/profile'}>
            {({ match }) => (
              <Container style={styles.tab}>
                <Icon name="contact" active={!!match} style={{textAlign:'center'}} />
                <Text style={{ fontSize: 9, textAlign:'center'}}>Profile</Text>
              </Container>
            )}
          </Route>
        </Tab>
      </TabList>
    </Tabs>
  );
};

const App = withRouter((props) => {
  return <DataTabs />;
});

const LogOut = () => {
  // TODO: Invalidate token
  return (
    <Redirect
      to={{
        pathname: "/log-in"
      }}
    />
  );
};

const ApolloApp = () =>
  <ApolloProvider client={client}>
    <Root>
      <NativeRouter>
        <Container>
          <Route path="/sign-up" component={SignUpScreen} />
          <Route path="/log-in" component={LogInScreen} />
          <Route path="/log-out" component={LogOut} />
          <Route path="/app" component={App} />
          <Redirect
            to={{
              pathname: "/sign-up"
            }}
          />
        </Container>
      </NativeRouter>
    </Root>
  </ApolloProvider>;

export default ApolloApp;
