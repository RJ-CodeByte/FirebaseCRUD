import { Text, StyleSheet, View, TouchableOpacity, Modal, Image, ActivityIndicator, FlatList } from 'react-native';
import React, { Component } from 'react';
import colors from '../constants/colors';
import AntDesign from "react-native-vector-icons/AntDesign";

import TodoList from '../components/TodoList';
import AddListModal from '../components/AddListModal';
import { AddLst, Lists, Todo } from '../constants/strings';
import FireConfig from '../config/FireConfig';
import { connect } from 'react-redux';
import { AddTodo } from '../redux/actions';




class TodoHome extends Component {
    state = {
        addTodoVisible: false,
    }


    componentDidMount() {
        fireBase = new FireConfig((error, user) => {
            if (error) {
                alert("Something Went Wrong")
            }

            fireBase.getLists(lists => {
                // this.setState({ lists, user }, () => {
                //     this.setState({ loading: false })
                // })
                this.props.addTodos(lists, user)
            })
        });
    }

    componentWillUnmount() {
        fireBase.detach();
    }

    toggleAddTodoModal() {
        console.log('this.addTodoVisible', !this.state.addTodoVisible)
        this.setState({ addTodoVisible: !this.state.addTodoVisible })
    }



    addList = list => {
        // this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, todos: [] }] })      
        fireBase.addList({
            name: list.name,
            color: list.color,
            todos: []
        })
    }

    updateList = list => {
        // this.setState({
        //   lists: this.state.lists.map(item => {
        //     return item.id === list.id ? list : item
        //   })
        // })
        fireBase.updateList(list);
    }

    renderList = list => {
        console.log('list', list.id)
        return <TodoList list={list} updateList={this.updateList} />
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size={"large"} color={colors.blue} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {/* <Image source={{ uri: 'yin_yang' }} style={{ height: 100, width: 100 }} /> */}
                <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
                    <AddListModal onPress={() => this.toggleAddTodoModal()} addList={this.addList} />
                </Modal>

                <View>
                    {/* <Text>User: {this.state.user.uid}</Text> */}
                </View>
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
                        keyExtractor={(_, index) => index.toString()}
                        data={this.props.list}
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

const mapStateToProps = (state) => {
    return {
        list: state.todoReducer.list,
        loading: state.todoReducer.loading
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addTodos: (name, color, todos) => dispatch(AddTodo(name, color, todos))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(TodoHome)