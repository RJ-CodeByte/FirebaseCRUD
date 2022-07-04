import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TodoStack from './src/navigations/TodoStack';
import { createStackNavigator } from '@react-navigation/stack';
import TodoHome from './src/screens/TodoHome';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';


const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <TodoStack />
    </NavigationContainer>
    </Provider>
  )
}

// export default class App extends Component {
//   render() {
//     return (
 
//     )
//   }
// }




// import { Text, StyleSheet, View, TouchableOpacity, Modal, Image, ActivityIndicator, FlatList } from 'react-native';
// import React, { Component } from 'react';
// import colors from './src/constants/colors';
// import AntDesign from "react-native-vector-icons/AntDesign";
// import tempData from './src/constants/tempData';
// import TodoList from './src/components/TodoList';
// import AddListModal from './src/components/AddListModal';
// import { AddLst, Lists, Todo } from './src/constants/strings';
// import FireConfig from './src/config.js/FireConfig';




// export default class App extends Component {
//   state = {
//     addTodoVisible: false,
//     lists: [],
//     loading: true,
//     user: {}
//   }


//   componentDidMount() {
//     fireBase = new FireConfig((error, user) => {
//       if (error) {
//         alert("Something Went Wrong")
//       }
//       console.log('user', user)

//       fireBase.getLists(lists => {
//         this.setState({ lists, user }, () => {
//           this.setState({ loading: false })
//         })
//       })


//       this.setState({ user })
//     });
//   }

//   componentWillUnmount() {
//     fireBase.detach();
//   }

//   toggleAddTodoModal() {
//     console.log('this.addTodoVisible', !this.state.addTodoVisible)
//     this.setState({ addTodoVisible: !this.state.addTodoVisible })
//   }



//   addList = list => {
//     // this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, todos: [] }] })
//     let task = {
//       title: '',
//       completed: ''
//     }
//     fireBase.addList({
//       name: list.name,
//       color: list.color,
//       todos: [task]
//     })
//   }

//   updateList = list => {
//     // this.setState({
//     //   lists: this.state.lists.map(item => {
//     //     return item.id === list.id ? list : item
//     //   })
//     // })
//     fireBase.updateList(list);
//   }

//   renderList = list => {
//     console.log('list', list.id)
//     return <TodoList list={list} updateList={this.updateList} />
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <View style={styles.container}>
//           <ActivityIndicator size={"large"} color={colors.blue} />
//         </View>
//       )
//     }
//     return (
//       <View style={styles.container}>
//         {/* <Image source={{ uri: 'yin_yang' }} style={{ height: 100, width: 100 }} /> */}
//         <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
//           <AddListModal onPress={() => this.toggleAddTodoModal()} addList={this.addList} />
//         </Modal>

//         <View>
//           <Text>User: {this.state.user.uid}</Text>
//         </View>
//         <View style={{ flexDirection: 'row' }}>
//           <View style={styles.divider} />
//           <Text style={styles.title}>
//             {Todo}
//             <Text style={{ fontWeight: '300', color: colors.blue }}>{Lists}</Text>
//           </Text>
//           <View style={styles.divider} />
//         </View>


//         <View style={{ marginVertical: '10%' }}>
//           <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
//             <AntDesign name='plus' size={16} color={colors.blue} />
//           </TouchableOpacity>
//           <Text style={styles.add}>{AddLst}</Text>
//         </View>


//         <View style={{ height: '30%', paddingLeft: '2%' }}>
//           <FlatList
//             horizontal
//             keyExtractor={(_, index) => index.toString()}
//             data={this.state.lists}
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => this.renderList(item)}
//             keyboardShouldPersistTaps='always'
//           />

//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   divider: {
//     backgroundColor: colors.lightBlue,
//     height: 1,
//     flex: 1,
//     alignSelf: 'center',
//   },
//   title: {
//     fontSize: 38,
//     fontWeight: '800',
//     color: colors.black,
//     paddingHorizontal: '15%',
//   },
//   addList: {
//     borderWidth: 2,
//     borderColor: colors.lightBlue,
//     borderRadius: 4,
//     padding: '5%',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   add: {
//     color: colors.blue,
//     fontWeight: '600',
//     fontSize: 14,
//     marginTop: '2%'
//   }
// });
