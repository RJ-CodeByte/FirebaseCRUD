import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoHome from '../screens/TodoHome';



const Stack = createStackNavigator();

export default function TodoStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"TodoHome"} options={{ headerShown: false }} component={TodoHome} />
        </Stack.Navigator>
    )
}

