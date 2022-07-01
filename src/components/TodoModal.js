import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Keyboard,
    Animated,
    TextInput
} from 'react-native';
import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors, { backgroundColors } from '../constants/colors';
import { Swipeable } from 'react-native-gesture-handler';
import { Lists } from '../constants/strings';

export default class TodoModal extends Component {
    state = {
        // name: this.props.list.name,
        // color: this.props.list.color,
        // todos: this.props.list.todos,
        newTodo: ""
    };




    toggleTodoCompleted = (index) => {
        let list = this.props.list
        list.todos[index].completed = !list.todos[index].completed
        this.props.updateList(list);
    }

    addTodo = () => {
        let list = this.props.list
        list.todos === undefined ? list.todos = [{
            title: this.state.newTodo,
            completed: false
        }] :
            list.todos.push({
                title: this.state.newTodo,
                completed: false
            })
        this.props.updateList(list);
        this.setState({ newTodo: "" })
        Keyboard.dismiss()
    }

    deleteToDo = index => {
        let list = this.props.list
        list.todos.splice(index, 1);
        this.props.updateList(list)
    }

    renderTodo = (todo, index) => {
        return (
            <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                        <Ionicons
                            name={todo.completed ? 'ios-square' : 'ios-square-outline'}
                            size={24}
                            color={colors.grey}
                            style={{ width: 32 }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.todo,
                            {
                                textDecorationLine: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? colors.grey : colors.black,
                            },
                        ]}>
                        {todo.title}
                    </Text>
                </View>
            </Swipeable>
        );
    };


    rightActions = (dragX, index) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: "clamp"
        })


        const opacity = dragX.interpolate({
            inputRange: [-100, -20, 0],
            outputRange: [1, 0.9, 0],
            extrapolate: "clamp"
        })



        return <TouchableOpacity onPress={() => this.deleteToDo(index)}>
            <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
                <Animated.Text style={{ color: colors.white, fontWeight: "800", transform: [{ scale }] }}>Delete</Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    }

    render() {
        const list = this.props.list
        const taskCount = list.todos?.length ?? 0;
        const completedCount = list.todos?.filter(
            todo => todo.completed,
        ).length ?? 0;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                        onPress={this.props.closeModal}>
                        <AntDesign name="close" size={24} color={colors.black} />
                    </TouchableOpacity>

                    <View
                        style={[
                            styles.section,
                            styles.header,
                            { borderBottomColor: list.color },
                        ]}>
                        <View>
                            <Text style={styles.title}>{list.name} </Text>
                            <Text style={styles.taskCount}>
                                {completedCount} of {taskCount} task{' '}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                        <FlatList
                            data={list.todos}
                            keyExtractor={(__, index) => index.toString()}
                            renderItem={({ item, index }) => this.renderTodo(item, index)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View
                        style={[styles.section, styles.footer]}>
                        <TextInput style={[styles.input, { borderColor: list.color }]} onChangeText={(text) => this.setState({ newTodo: text })} value={this.state.newTodo} />
                        <TouchableOpacity
                            style={[styles.addTodo, { backgroundColor: list.color }]}
                            onPress={() => this.addTodo()}
                        >
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        // flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        paddingTop: '5%',
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.grey,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '8%'
    }, todo: {
        fontSize: 15,
        fontWeight: '700'
    },
    deleteButton: {
        flex: 1,
        backgroundColor: colors.red,
        justifyContent: "center",
        alignItems: "center",
        width: 80,
    }
});
