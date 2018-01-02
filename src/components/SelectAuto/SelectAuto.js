import * as React from 'react';
import { connect } from 'react-redux';
import { theme, colors } from 'style';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Loading from 'components/UI/Loading';
import {
  getMarks,
  getModels,
  getYears,
  getBodies,
  getGenerations,
  getTrims,
  getAutoId,
} from 'actions/auto';

class SelectAuto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      depth: 0,
      done: false,
      selected: [],
      steps: [
        {
          name: 'marks',
          label: 'Markanı seçin'
        },
        {
          name: 'models',
          label: 'Modeli seçin'
        },
        {
          name: 'years',
          label: 'Modelin ilini seçin'
        },
        {
          name: 'bodies',
          label: 'Body seçin'
        },
        {
          name: 'generations',
          label: 'Generation seçin'
        },
        {
          name: 'trims',
          label: 'Trim seçin'
        },
        {
          name: 'done',
          label: 'Sizin avto'
        },
      ]
    };
  }

  componentDidMount(nextProps) {
    this.props.onGetMarks();
  }

  _tapHandler = (depth, value, label) => {
    const { selected, steps, depth: depthState } = this.state;

    const selectedArray = selected;
    selectedArray.push({ [steps[depth].name]: value, label });

    this.setState(
      prev => ({
        ...prev,
        searchText: '',
        depth: prev.depth + 1,
        selected: selectedArray,
      }),
      this._getList(this.state.depth + 1, value)
    );
  };

  _getList = (depth, value) => {
    const { selected } = this.state;
    this.setState({
      block: false
    })

    if (depth === 1) {
      this.props.onGetModels(value);
    }
    if (depth === 2) {
      this.props.onGetYears(value);
    }
    if (depth === 3) {
      this.props.onGetBodies(selected.find(i => i && i.models).models, value);
    }
    if (depth === 4) {
      this.props.onGetGenerations(
        selected.find(i => i && i.models).models,
        selected.find(i => i && i.years).years,
        value,
      );
    }
    if (depth === 5) {
      this.props.onGetTrims(
        selected.find(i => i && i.models).models,
        selected.find(i => i && i.years).years,
        selected.find(i => i && i.bodies).bodies,
        value,
      );
    }

    if (depth === 6) {
      this.setState(prev => ({
        ...prev,
        done: true,
      }))
    }
  };
  
  _done = () => {
    const { selected } = this.state;
    this.props.onGetAutoId(
      selected.find(i => i && i.models).models,
      selected.find(i => i && i.years).years,
      selected.find(i => i && i.bodies).bodies,
      selected.find(i => i && i.generations).generations,
      selected.find(i => i && i.trims).trims,
      true
    );
    this.props.navigation.goBack();
  }

  _reset = () => {
    this.setState({
      depth: 0,
      selected: [],
      searchText: '',
      done: false,
    });
  }

  _resetAndClose = () => {
    this.setState({
      depth: 0,
      selected: [],
      searchText: '',
      done: false,
    });
    this.props.navigation.goBack()
  }

  render() {
    const { auto, loading } = this.props;
    const { depth, searchText, steps, selected, done } = this.state;
    const list =
      searchText && auto[steps[depth].name]
        ? auto[steps[depth].name].filter(item =>
            item.label &&
            item.label.match(new RegExp(searchText, 'gi'))
          )
        : auto[steps[depth].name];

    return <View style={{ flex: 1, flexDirection: 'column', backgroundColor: colors.white }}>
        {loading && <Loading />}
        <View style={{ padding: 10 }}>
        {!done && <Input 
          fullWidth white
          noValidation withBorder
          placeholder="axtar" 
          value={searchText} 
          returnKeyType={'done'} 
          onChangeText={value => this.setState(
            prev => ({ ...prev, searchText: value })
          )} />}
        </View>
        <View style={{ paddingTop: 0, flex: 2 }}>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 60 }}>
            <Text style={[ theme.h1 ]}>
              {steps[depth].label}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {selected && selected.map(i => <Text key={String(Math.random()).substr(2)} style={ theme.tag }>{i.label}</Text>)}
            </View>
          </View>
          {
            done &&
            <View>
              <Text>Avtonuzu seçdiniz</Text>
              <Button title="Tamamla" onPress={ this._done } />
            </View>
          }
          <View style={[ { flex: 2 } ]}>
            {!loading && <FlatList
              removeClippedSubviews={true}
              keyExtractor={item => item._id}
              data={list}
              maxToRenderPerBatch={10}
              ItemSeparatorComponent={ () => <View style={ { width: '100%', height: 1, backgroundColor: colors.snow300 } } /> }
              renderItem={({ item }) => 
                <ListItem disabled={loading} tapHandler={() => this._tapHandler(depth, item._id, item.label)} item={item} />
              }
              />}
          </View>
        </View>
        <View style={{ padding: 10, paddingBottom: 0, flexDirection: 'row', flex: 0, backgroundColor: colors.darkG }}>
          <Button naked onPress={this._reset} title="Yenidən" style={{ marginRight: 5, padding: 10 }} />
          <Button black onPress={this._resetAndClose} title="Bağla" style={{ padding: 10 }} />
        </View>
      </View>;
  }
}

class ListItem extends React.PureComponent {
  render() {
    const { tapHandler, item, disabled } = this.props;

    return (
      <Ripple onPress={tapHandler} disabled={disabled}>
        <Text style={theme.selectItem}>{item.label}</Text>
      </Ripple>
    );
  }
}

const mapStateToProps = ({ auto, router }) => ({
  auto,
  router,
  loading: auto.loading
});

const mapDispatchToProps = dispatch => ({
  onGetMarks: () => dispatch(getMarks()),
  onGetModels: markId => dispatch(getModels(markId)),
  onGetYears: modelId => dispatch(getYears(modelId)),
  onGetBodies: (modelId, yearId) => dispatch(getBodies(modelId, yearId)),
  onGetGenerations: (modelId, yearId, bodyId) => dispatch(getGenerations(modelId, yearId, bodyId)),
  onGetTrims: (modelId, yearId, bodyId, generationId) => dispatch(getTrims(modelId, yearId, bodyId, generationId)),
  onGetAutoId: (modelId, yearId, bodyId, generationId, trimId, option) => dispatch(getAutoId(modelId, yearId, bodyId, generationId, trimId, option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectAuto);
