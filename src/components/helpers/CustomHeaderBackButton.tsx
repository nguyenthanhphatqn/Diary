import React from 'react';
import {
    View,
    Text,
    Platform,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import CreateBackButton from './BackButton';
import { Icon } from 'react-native-elements'
import { scale, verticalScale } from './Scaling';
import { MAIN_GRAY } from '../../../assets/color';
const DEVICES = [
    'iPhone X',
    'iPhone XS',
    'iPhone XS Max',
    'iPhone XR'
]

const DEVICE_HEIGHTS = {
    "iPhone X": 812,
    "iPhone XS": 812,
    "iPhone XS Max": 896,
    "iPhone XR": 896,
}

const CustomBackHeader = (props) => {
    const { nav, nav_to, show_backButton, booking_type, screen_title, is_cross, delete_pressed, is_delete } = props;
    const { height, width } = Dimensions.get("window");
    const device_name = DeviceInfo.getModel();
    let is_zoomed = false;
    if (DEVICES.includes(device_name)) {
        if (DEVICE_HEIGHTS[device_name] > height) {
            is_zoomed = true;
        }
    }
    return (
        <View
            style={{
                height: Platform.OS == "ios" ? (is_zoomed ? verticalScale(93.75) : verticalScale(63.75)) : verticalScale(55.75),
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: show_backButton ? "space-between" : "center",
                alignItems: "flex-end",
                paddingBottom: 8,
                // shadowColor: '#000',
                // shadowOffset: { width: 0, height: 0.2 },
                // shadowOpacity: is_zoomed ? null : 0.3,
                // elevation: 12,
                position: 'relative',
                // borderBottomWidth: 0.4,
                // borderBottomColor: "rgba(0,0,0,0.3)"
            }}
        >
            {
                show_backButton
                &&
                <CreateBackButton navigate={nav} nav_to={nav_to} booking_type={booking_type} screen_title={screen_title} is_cross={is_cross} />
            }

            <Text
                style={{
                    fontFamily: "BurlingamePro-CondBold",
                    fontSize: scale(16),
                    color: "#666666",
                }}
            >
                {props.title}
            </Text>

            {
                show_backButton
                &&
                <>
                    {
                        !is_delete ?
                            <View></View>
                            :
                            <TouchableOpacity onPress={() => {
                                delete_pressed()
                            }}>
                                <Icon color={MAIN_GRAY} name="trash" type="font-awesome" size={28} style={{ marginRight: scale(12) }} />
                            </TouchableOpacity>

                    }
                </>
            }

        </View>
    )
};

export default CustomBackHeader;
