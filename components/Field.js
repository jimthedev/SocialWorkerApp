import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'

export default class Field extends Component {
  renderError() {
    if (this.props && this.props.error) {
      return <Text style={{color: 'red'}}>{this.props.error}</Text>
    }
    return <Text>No Error</Text>
  }

  render() {

    const {
      error,
      children,
      ...rest
    } = this.props;

    return (
      <View>
        {this.props.children({inputProps: rest})}
        {/* {this.renderError()} */}
      </View>
    )
  }
}
