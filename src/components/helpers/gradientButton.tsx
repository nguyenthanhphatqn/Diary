import React, { Component } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { ENTRY_MAIN_COLOR, YELLOW_COLOR } from '../../../assets/color';
import { scale } from './Scaling';
const GradientButton = (props) => {
    return (
        <TouchableOpacity onPress={props.on_press}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={[props.color_one, props.color_two]} style={[styles.touchable_bg, props.custom_style]}>
                <Icon
                    color={'#fff'}
                    name={props.icon_value}
                    type="material-community"
                    size={scale(27.5)}
                />
                <Text
                    style={[styles.text_color, props.text_style]}
                >
                    {props.button_label}
                </Text>
                {props.showLoading
                    &&
                    <ActivityIndicator size="small" color={'#fff'} style={{ marginLeft: 8, marginRight: 8 }} />
                }
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = {
    touchable_bg: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    text_color: {
        textAlign: 'center',
        fontSize: scale(12),
        marginLeft: scale(6),
        color: '#fff',
    }
}

export default GradientButton;
