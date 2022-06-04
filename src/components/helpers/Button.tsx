import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
const Button = (props) => {
    return (
        <TouchableOpacity
            onPress={props.on_press}
            style={[styles.touchable_bg, props.custom_style]}>
            <Text style={[styles.text_color, props.text_style]}>
                {props.button_label}
            </Text>
            {
                props.show_icon
                &&
                <Icon
                    color={'#fff'}
                    name="chevron-thin-down"
                    type="entypo"
                    size={20}
                    containerStyle={{
                        position: "absolute",
                        right: 5,
                    }}
                />
            }
            {
                props.show_spinner
                &&
                <ActivityIndicator size="small" color={'#fff'} style={{ marginLeft: 8, marginRight: 8 }} />

            }
        </TouchableOpacity>
    );
}
const styles = {
    touchable_bg: {
        backgroundColor: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: "center"
    },
    text_color: {
        fontSize: 12,
        color: '#fff',
    }
}
export default Button;
