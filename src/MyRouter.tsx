import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from './Tabs';
import AddEntry from './components/pages/AddEntry';
import StoryDetail from "./components/pages/StoryDetail";
import LoginView from './components/pages/LoginView';
const Stack = createStackNavigator();
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};
const tabOptions = {
    showLabel: false,
    style: {
        height: 70,
        backgroundColor: '#fff',

    },
};
const MyTransition = {
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};
export default function MyRouter() {
    return (
        <NavigationContainer theme={theme}>
            {
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                     <Stack.Screen options={{ ...MyTransition }} name="LoginView" component={LoginView} />
                    <Stack.Screen options={{ ...MyTransition }} name="EntryList" component={Tabs} />
                    <Stack.Screen options={{ ...MyTransition }} name="EntryCalendar" component={Tabs} />
                    <Stack.Screen options={{ ...MyTransition }} name="AddEntry" component={AddEntry} />
                    <Stack.Screen options={{ ...MyTransition }} name="StoryDetail" component={StoryDetail} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    );
}