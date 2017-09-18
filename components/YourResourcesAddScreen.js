import React from "react";
import { Alert, Text, View } from "react-native";
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  List,
  ListItem,
  Left,
  Right,
  Title
} from "native-base";
import { graphql, gql } from "react-apollo";
import Field from "./Field";
import validate from "../lib/validate";
import TagsSearchResults from './TagsSearchResults';

const styles = {
  container: {
    backgroundColor: "#FFF"
  }
};

const CREATE_RESOURCE_MUTATION = gql`
  mutation createResource(
    $createResourceName: String!
    $createResourceTagIds: [ID!]
  ) {
    createResource(
      name: $createResourceName
      createdById: "cj5lujaf0r07n0134x41tsu5j"
      tagsIds: $createResourceTagIds
    ) {
      id
    }
  }
`;

const validationRules = {
  name: {
    presence: {
      message: "^Please enter a resource name"
    },
    length: {
      minimum: 3,
      message: "^Resource names must be at least 3 characters."
    }
  }
};

class YourResourcesAddScreen extends React.Component {
  state = {
    name: "",
    nameError: "",
    labels: [],
    labelsError: "",
    labelSearch: ""
  };
  constructor(props) {
    super(props);
  }
  validateRegister(success) {
    const nameError = validate(validationRules, "name", this.state.name);
    const labelsError = validate(validationRules, "labels", this.state.labels);

    this.setState({
      nameError: nameError,
      labelsError: labelsError
    });

    if (!nameError && !labelsError) {
      success();
    }
  }
  render() {
    const { goBack } = this.props.history;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                goBack();
              }}
            >
              <Text style={{ fontSize: 16 }}>Cancel</Text>
            </Button>
          </Left>
          <Body style={{ flexGrow: 2 }}>
            <Title>Create Resource</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.validateRegister(() => {
                  this.props
                    .createResource({
                      name: this.state.name.trim(),
                      tagIds: [
                        "cj68edcx71fsj01528gjrvjmh",
                        "cj68edcx71fsi0152re6cccgw"
                      ]
                    })
                    .then(() => {
                      this.props.history.push("/app/resources/your");
                    });
                });
              }}
            >
              <Text style={{ fontSize: 16 }}>Add</Text>
            </Button>
          </Right>
        </Header>
        <Content padder keyboardShouldPersistTaps="always">
          <Form>
            <Field
              onChangeText={value => this.setState({ name: value })}
              onBlur={() =>
                this.setState({
                  nameError: validate(validationRules, "name", this.state.name)
                })}
              blurOnSubmit
              error={this.state.nameError}
            >
              {({ inputProps }) =>
                <View>
                  <Item
                    floatingLabel
                    success={false}
                    error={!!this.state.nameError}
                  >
                    <Label>Name</Label>
                    <Input value={this.state.name} {...inputProps} />
                    {this.state.nameError ? <Icon name="close-circle" /> : null}
                  </Item>
                  <Text style={{ color: "red", marginLeft: 15 }}>
                    {this.state.nameError}
                  </Text>
                </View>}
            </Field>
            <Item floatingLabel style={{ marginTop: 10, paddingBottom: 10 }}>
              <Label>Add tags</Label>
              <Input
                value={this.state.labelSearch}
                onFocus={() =>
                  this.setState({ active: this.state.labels.length === 0 })}
                onBlur={() => this.setState({ active: false })}
                onChangeText={val =>
                  this.setState({ active: val.length > 2, labelSearch: val })}
              />
            </Item>

            {!this.state.active &&
            this.state.labels &&
            this.state.labels.length > 0
              ? <List style={{ flex: 1 }}>
                  {this.state.labels.map((label, index) =>
                    <ListItem key={index}>
                      <Text>
                        {label}
                      </Text>
                    </ListItem>
                  )}
                </List>
              : null}

              {this.state.active &&
              this.state.labelSearch &&
              this.state.labelSearch.length > 2
                ? <TagsSearchResults searchTerm={this.state.labelSearch} onPress={(action) =>
                  this.setState({
                    active: false,
                    labels: this.state.labels.concat([

                      action.tag.label
                    ]),
                    labelSearch: ""
                  })} /> : null }
            {/* {this.state.active &&
            this.state.labelSearch &&
            this.state.labelSearch.length > 2
              ? <List style={{ flex: 1, paddingLeft: 20 }}>
                  <ListItem
                    onPress={() =>
                      this.setState({
                        active: false,
                        labels: this.state.labels.concat([
                          this.state.labelSearch
                        ]),
                        labelSearch: ""
                      })}
                  >
                    <Text>Add tag: 'Hello'</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Create tag: `Hello`</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Hello</Text>
                  </ListItem>
                </List>
              : null} */}


            {/* <Item
              onPress={() => this.setState({ active: true })}
              style={{
                alignItems: "flex-start",
                flexDirection: "column",
                marginTop: 20
              }}
            >
              </Item> */}
            {/* <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{fontSize: 16}}>Hello there, yep, yep, hello, hello there, we aren't there, but try again, yep there isn't, a way to go</Text>
              </View> */}
            {/* <Input style={{color: "#aaa"}}
                editable={false}
                value="Hello there, yep, family" /> */}

            {/* <Field>
              <Item stackedLabel success={false} error={false} last>
                <Label>Labels {this.state.labels}</Label>
                <Input value={this.state.labels} />
                <Icon name='checkmark-circle' />
              </Item>
            </Field> */}
          </Form>
          {/* <Button
            transparent
            onPress={() => {
              this.props
                .createResource({
                  name: "Hazelden",
                  tagIds: [
                    "cj68edcx71fsj01528gjrvjmh",
                    "cj68edcx71fsi0152re6cccgw"
                  ]
                })
                .then(() => {
                  this.props.history.push("/app/resources/your");
                });
            }}
          >
            <Text>Add Hazelden</Text>
          </Button>
          <Button
            transparent
            onPress={() => {
              this.props
                .createResource({
                  name: "Ronald McDonald House",
                  tagIds: ["cj62jbgu76d8s018926gctpwa"]
                })
                .then(() => {
                  this.props.history.push("/app/resources/your");
                });
            }}
          >
            <Text>Add Ronald McDonald</Text>
          </Button> */}
        </Content>
      </Container>
    );
  }
}

// const NewEntryWithData = graphql(submitRepository, {
//   props: ({ mutate }) => ({
//     submit: (repoFullName) => mutate({ variables: { repoFullName } }),
//   }),
// })(NewEntry);

export default graphql(CREATE_RESOURCE_MUTATION, {
  props: ({ mutate }) => ({
    createResource: ({ name, tagIds }) =>
      mutate({
        variables: {
          createResourceName: name,
          createResourceTagIds: tagIds
        }
      })
  })
})(YourResourcesAddScreen);
