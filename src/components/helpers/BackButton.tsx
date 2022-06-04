import React from 'react';
import { Icon } from 'react-native-elements'
import { LIGHT_GRAY, MAIN_GRAY } from "../../../assets/color";
import { TouchableOpacity } from 'react-native';

const CreateBackButton = (props) => {
    return (
        <TouchableOpacity style={{ marginLeft: 12 }}
            onPress={() => {
                props.navigate.goBack()
            }} >
            {props.is_cross ?
                <Icon color={MAIN_GRAY} name="close" type="evil-icons" size={28} />
                :
                <Icon color={MAIN_GRAY} name="chevron-thin-left" type="entypo" size={26} />}
        </TouchableOpacity>
    );
}
export default CreateBackButton;
