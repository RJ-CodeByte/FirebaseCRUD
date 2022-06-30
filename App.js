import { Text, StyleSheet, View, TouchableOpacity, Modal, Image } from 'react-native';
import React, { Component } from 'react';
import colors from './src/constants/colors';
import AntDesign from "react-native-vector-icons/AntDesign";
import { FlatList } from 'react-native-gesture-handler';
import tempData from './src/constants/tempData';
import TodoList from './src/components/TodoList';
import AddListModal from './src/components/AddListModal';
import { AddLst, Lists, Todo } from './src/constants/strings';



export default class App extends Component {
  state = {
    addTodoVisible: false,
    lists: tempData
  }


  toggleAddTodoModal() {
    console.log('this.addTodoVisible', !this.state.addTodoVisible)
    this.setState({ addTodoVisible: !this.state.addTodoVisible })
  }

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} />
  }

  addList = list => {
    this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, todos: [] }] })
  }

  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item
      })
    })
  }


  render() {
    return (
      <View style={styles.container}>
        {/* <Image source={{ uri: 'yin_yang' }} style={{ height: 100, width: 100 }} /> */}
        <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModal onPress={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            {Todo}
            <Text style={{ fontWeight: '300', color: colors.blue }}>{Lists}</Text>
          </Text>
          <View style={styles.divider} />
        </View>


        <View style={{ marginVertical: '10%' }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name='plus' size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>{AddLst}</Text>
        </View>


        <View style={{ height: '30%', paddingLeft: '2%' }}>
          <FlatList
            horizontal
            data={this.state.lists}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps='always'
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: '15%',
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: '2%'
  }
});
