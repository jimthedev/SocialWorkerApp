import React from "react";
import { List, ListItem, Spinner, Text } from "native-base";
import { graphql, gql } from "react-apollo";

const SEARCH_TAGS_QUERY = gql`
  query searchTags($tagSearchTerm: String!) {
    allTags(filter: { label_contains: $tagSearchTerm }) {
      id
      label
    }
  }
`;

class TagsSearchResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { searchTerm, searchTags, onPress } = this.props;
    const { loading, allTags } = searchTags;

    if (loading) {
      return (
        <List>
          <ListItem
            style={{ flex: 1, justifyContent: "center", borderBottomWidth: 0 }}
          >
            <Spinner />
          </ListItem>
        </List>
      );
    }
    return (
      <List>
        { !_.some(allTags, {
          label: searchTerm.toLowerCase()
        })
          ? <ListItem
              onPress={onPress.bind(this, {
                action: "CREATE",
                tag: { label: searchTerm.toLowerCase() }
              })}
            >
              <Text>
                Create '{searchTerm.toLowerCase()}' tag
              </Text>
            </ListItem>
          : null}
        {allTags.length > 0
          ? allTags.map(tag => {
              const { id, label } = tag;
              return (
                <ListItem
                  key={id}
                  onPress={onPress.bind(this, {
                    action: "ADD",
                    tag
                  })}
                >
                  <Text>
                    Add '{label}' tag
                  </Text>
                </ListItem>
              );
            })
          : null}
      </List>
    );
  }
}

export default graphql(SEARCH_TAGS_QUERY, {
  name: "searchTags",
  options: props => {
    return {
      fetchPolicy: "cache-and-network",
      variables: {
        tagSearchTerm: props.searchTerm
      }
    };
  }
})(TagsSearchResults);
