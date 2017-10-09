import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Picker,
  Button
} from "react-native";
import { getMarks, clearCarCache, MARKS } from 'actions/auto';

class SelectAuto extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedMarkValue: 0,
    selectedMark: ''
  }

  componentWillMount() {
    this.props.onGetMarks();
  }

  _selectHandler = (itemValue, itemIndex) => {
    const { auto } = this.props;
    const marks = auto.get('marks');

    this.setState({
      selectedMarkValue: itemValue,
      selectedMark: marks[itemIndex].label
    });
  }

  render() {
    const { auto } = this.props;
    const marks = auto.get('marks');
    const { selectedMark, selectedMarkValue } = this.state;

    return <View>
        <Picker
          onValueChange={ this._selectHandler }
          selectedValue={ selectedMarkValue }
          >
          {marks && marks.map(({ _id, label }) => (
              <Picker.Item
                key={_id}
                label={label}
                value={_id} />
            ))}
          {!marks.length && <Picker.Item label={"Loading..."} value={0} />}
        </Picker>
        <Text>Your car is { selectedMark } </Text>
        <Button title="Clear cache" onPress={() => this.props.onClearCarCache(MARKS)} />
      </View>;
  }
}

const mapStateToProps = ({ auto }) => ({
  auto
})

const mapDispatchToProps = dispatch => ({
  onGetMarks: () => dispatch(getMarks()),
  onClearCarCache: (key) => dispatch(clearCarCache(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectAuto);