import React from 'react';
import { Text } from 'react-native';
import { YELLOW_COLOR } from '../../../assets/color';
import { scale, verticalScale } from './Scaling';

const ErrorText = ({ error_text, text_style }) => (
    <Text style={[styles.text, text_style]} >
        {error_text}
    </Text>
);

const styles = {
    text: {
        color: YELLOW_COLOR,
        fontSize: scale(11),
        fontFamily: "BurlingamePro-CondBold",
        marginTop: verticalScale(6)
    },
}

export default ErrorText;
