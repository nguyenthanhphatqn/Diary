import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EntryListing from "./components/EntryListing/EntryListing";
import { PRIMARY_COLOR, ONYX_COLOR, ENTRY_COLOR, ENTRY_MAIN_COLOR, LIGHT_GRAY } from "../assets/color";
import EntryCalendar from "./components/entryCalendar/EntryCalendar";
import { Icon } from 'react-native-elements';
const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: '#fff',

    },
};
const Tabs = () => {

    return (
        <Tab.Navigator
            tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case "EntryListing":
                            return (
                                <Icon
                                    color={focused ? ENTRY_MAIN_COLOR : ONYX_COLOR}
                                    name="home"
                                    type="entypo"
                                    size={30}
                                />
                            );
                        case "EntryCalendar":
                            return (
                                <Icon
                                    color={focused ? ENTRY_MAIN_COLOR : ONYX_COLOR}
                                    name="calendar"
                                    type="entypo"
                                    size={30}
                                />
                            );

                    }
                }
            })}
        >
            <Tab.Screen
                name="EntryListing"
                component={EntryListing}
            />
            <Tab.Screen
                name="EntryCalendar"
                component={EntryCalendar}
            />
        </Tab.Navigator >
    );
};

export default Tabs;