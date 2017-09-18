import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'

export default class TextField extends Component {
  renderError() {
    if (this.props.error) {
      return <Text style={{color: 'red'}}>{this.props.error}</Text>
    }
    return <Text></Text>
  }

  render() {

    const {
      error,
      ...rest
    } = this.props;

    return (
      <View>
        <TextInput {...rest} />
        {this.renderError()}
      </View>
    )
  }
}
