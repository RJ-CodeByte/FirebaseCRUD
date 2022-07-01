import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors, { backgroundColors } from '../constants/colors';
import { btnTitle, createTodoList } from '../constants/strings';

class AddListModal extends React.Component {
    state = {
        name: '',
        color: backgroundColors[0],
    };

    createTodo = () => {
        const { name, color } = this.state
        // tempData.push({
        //     name,
        //     color,
        //     todos: []
        // })
        const list = { name, color, todos: [] }
        this.props.addList(list);
        this.setState({ name: '' });
        this.props.onPress();
    }

    renderColor() {
        return backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}></TouchableOpacity>
            );
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity
                    style={{ position: 'absolute', top: 64, right: 30 }}
                    onPress={this.props.onPress}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
                    <Text style={styles.title}>{createTodoList}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="List Name?"
                        onChangeText={text => this.setState({ name: text })}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>{this.renderColor()}</View>
                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo}
                    >
                        <Text style={{ color: colors.white, fontWeight: '600' }}>
                            {btnTitle}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default AddListModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: '5%',
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: '20%',
        marginTop: 8,
        fontSize: 18,
        paddingHorizontal: '5%',
    },
    create: {
        marginTop: '10%',
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorSelect: {
        width: 30,
        height: 30, borderRadius: 4
    }
});
