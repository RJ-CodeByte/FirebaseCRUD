import { Modal, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import TodoModal from './TodoModal'
import { Completed, Remaining } from '../constants/strings'

class TodoList extends React.Component {

    state = {
        showListVisible: false
    }

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }

    render() {
        const list = this.props.list
        console.log('list', list)
        const completedCount = list.todos?.filter(todo => todo.completed).length ?? 0;
        const remainingCount = list.todos?.length === undefined ? (list.todos?.length ?? 0 - completedCount) : (list.todos?.length - completedCount)
        return (
            <>
                <Modal animationType='slide' visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
                    <TodoModal list={list} closeModal={() => this.toggleListModal()} updateList={this.props.updateList} />
                </Modal>
                <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]} onPress={() => this.toggleListModal()}>
                    <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subTitle}>{Remaining}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subTitle}>{Completed}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
}

export default TodoList

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: '5%',
        paddingHorizontal: '2%',
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginVertical: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white
    },
    subTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }
})