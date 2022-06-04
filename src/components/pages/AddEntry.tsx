import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import { ENTRY_MAIN_COLOR, LIGHT_GRAY, MAIN_GRAY, ONYX_COLOR, YELLOW_COLOR } from "../../../assets/color";
import CustomBackHeader from '../helpers/CustomHeaderBackButton';
import ErrorText from '../helpers/ErrorText';
import { scale, verticalScale } from '../helpers/Scaling';
import GradientButton from '../helpers/gradientButton';
import MyStorage from '../helpers/MyStorage';
import { Icon } from 'react-native-elements';
interface State {
    entryList: number[];
    name: string;
    show_given_name_label: boolean;
    description: string;
    show_description_label: boolean;
    is_date_modal_visible: boolean;
    date_picker_value: any;
    entry_date: any;
    name_error: string;
    show_name_error: boolean;
    description_error: string;
    show_description_error: boolean;
    show_date_label: boolean;
    show_create_error: boolean;
    create_error: string;
    show_loading: boolean;
    item_id: string;
    is_editing: boolean;
}
interface Props {
    navigation: any;
    route: any;
}
class AddEntry extends Component {
    state: State;
    props: Props;
    constructor(props) {
        super(props);
        this.state = {
            entryList: [],
            name: '',
            show_given_name_label: false,
            description: '',
            show_description_label: false,
            is_date_modal_visible: false,
            date_picker_value: Platform.OS == 'android' ? moment() : new Date(),
            entry_date: Platform.OS == 'android' ? moment() : new Date(),
            name_error: '',
            show_name_error: false,
            description_error: '',
            show_description_error: false,
            show_date_label: false,
            show_create_error: false,
            create_error: '',
            show_loading: false,
            item_id: '',
            is_editing: false,
        };
    }
    componentDidMount() {
        if (this?.props?.route?.params?.item) {
            let { item } = this.props?.route?.params
            this.setState({
                item_id: item.id,
                name: item.title,
                description: item.description,
                is_editing: true
            })
        }
    }
    showDatePicker = () => {
        this.setState({
            is_date_modal_visible: true
        })
    }
    createInputField = (
        id: number,
        label: String,
        is_mandatory: boolean,
        multiline: boolean,
        ref: string,
        value: any,
        show_label: boolean,
        input_placeholder_label: string,
        input_error: string,
        is_error_visible: boolean,
        keyboard_type: any,
        input_handler: any,
        editable: boolean
    ) => {
        return (
            <View style={{
                marginBottom: 0,
                paddingTop: 16,
                marginRight: id == 3 ? scale(8) : 0,
                width: (id == 3 || id == 4) ? '50%' : '100%',
            }} >

                {
                    show_label &&
                    <Text
                        style={{
                            fontSize: scale(11),
                            alignSelf: "flex-start",
                            paddingLeft: scale(8),
                            marginBottom: verticalScale(4),
                            fontFamily: "BurlingamePro-CondSemiBold",
                            color: ONYX_COLOR,
                            elevation: 8,
                        }}
                    >
                        {is_mandatory ? `${label}*` : label}
                    </Text>
                }
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: scale(8),
                    paddingRight: scale(8),
                    paddingBottom: Platform.OS == 'ios' ? verticalScale(10) : 0,
                    paddingTop: Platform.OS == 'ios' ? verticalScale(10) : 0,
                    width: "100%",
                    borderColor: LIGHT_GRAY,
                    borderBottomWidth: 1,
                    alignItems: "center"
                }}>
                    <TextInput
                        editable={true}
                        keyboardType={keyboard_type}
                        returnKeyType={Platform.OS == "ios" ? "done" : 'none'}
                        underlineColorAndroid='transparent'
                        autoCapitalize="none"
                        multiline={multiline}
                        autoCorrect={false}
                        placeholder={is_mandatory ? `${input_placeholder_label}*` : input_placeholder_label}
                        placeholderTextColor="#bbb"
                        value={value}
                        onChangeText={(text) => input_handler(text)}
                        style={{
                            flex: 1,
                            color: "#848484",
                            fontSize: scale(12),
                            fontFamily: "BurlingamePro-CondSemiBold"
                        }}
                        ref={ref}
                    />
                </View>
                {
                    is_error_visible &&
                    <ErrorText text_style={{}} error_text={input_error} />
                }
            </View>
        );
    }
    handleGivenName = (text) => {
        this.setState({ name: text }, () => {
            if (this.state.name.length > 0) {
                this.setState({ show_given_name_label: true, show_name_error: false, });
            } else {
                this.setState({ show_given_name_label: false, });
            }
        });
    }
    handleDescription = (text) => {
        this.setState({ description: text }, () => {
            if (this.state.description.length > 0) {
                this.setState({ show_description_label: true, show_description_error: false, });
            } else {
                this.setState({ show_description_label: false, });
            }
        });
    }
    setEntryDate = (date) => {
        this.setState({
            entry_date: date
        })
    }
    showDatePickerModal = () => {
        let text_info1 = ''
        text_info1 = "Pick Date";
        let currentDate = new Date();
        return (
            <Modal
                style={{
                    justifyContent: "flex-end",
                    margin: 0,
                    marginHorizontal: scale(16)
                }}
                useNativeDriver={true}
                backdropTransitionOutTiming={0}
                animationInTiming={500}
                animationOutTiming={500}
                isVisible={this.state.is_date_modal_visible}
                onBackdropPress={() => {
                    this.setState({
                        is_date_modal_visible: false
                    })
                }}
            >
                <View
                    style={{
                        maxHeight: '95%',
                        justifyContent: "center",
                        backgroundColor: '#fff',
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderTopLeftRadius: scale(24),
                        borderTopRightRadius: scale(24),
                        paddingTop: verticalScale(4)
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            paddingHorizontal: scale(18)
                        }}>
                            <Text
                                style={{
                                    marginTop: verticalScale(12),
                                    marginBottom: verticalScale(8),
                                    fontSize: scale(14),
                                    color: ENTRY_MAIN_COLOR,
                                    fontFamily: "BurlingamePro-CondBold",
                                    alignSelf: "center",
                                    paddingHorizontal: scale(2),
                                    textAlign: "center",
                                }}
                            >
                                {text_info1.toUpperCase()}
                            </Text>
                            {
                                <DatePicker
                                    date={this.state.date_picker_value}
                                    mode={'date'}
                                    // minimumDate={currentDate}
                                    maximumDate={currentDate}
                                    onDateChange={(date) => {
                                        if (date) { this.setState({ date_picker_value: date }) }
                                    }}
                                />

                            }

                        </View>
                    </View>
                    <View style={{
                        flexDirection: "column",
                        marginTop: verticalScale(12),
                    }} >
                        <GradientButton
                            button_label={'CONFIRM'}
                            color_one={ENTRY_MAIN_COLOR}
                            color_two={YELLOW_COLOR}
                            on_press={() => {
                                if (this.state.date_picker_value) {
                                    this.setEntryDate(moment(this.state.date_picker_value).format('YYYY-MM-DD'))
                                } else {
                                    this.setEntryDate(moment().format('YYYY-MM-DD'))
                                }
                                this.setState({
                                    is_date_modal_visible: false
                                })
                            }}
                            text_style={{
                                fontFamily: 'BurlingamePro-SemiBold',
                                color: ONYX_COLOR,
                                paddingHorizontal: scale(60),
                                fontSize: scale(16)
                            }}
                            custom_style={{
                                marginBottom: verticalScale(16),
                                backgroundColor: 'transparent',
                                height: verticalScale(37.5),
                                borderRadius: scale(24)
                            }}
                        />
                    </View>
                </View>
            </Modal>
        );

    }
    saveEntry = async () => {
        this.setState({
            show_loading: true
        })
        if (this.state.name.trim() == '') {
            this.setState({
                show_name_error: true,
                show_loading: false,
                name_error: 'Please enter title'
            })
            return
        } else if (this.state.description.trim() == '') {
            this.setState({
                description_error: 'please enter description',
                show_description_error: true,
                show_loading: false,
            })
            return
        }
        let oldEntry = []
        const { name, description, entry_date, item_id, is_editing } = this.state;
        let check = await new MyStorage().getEntry().then(result => {
            if (result)
                return JSON.parse(result)
            else {
                return false
            }
        });
        if (check) {
            oldEntry = check
        }
        if (is_editing) {
            oldEntry = oldEntry.filter(item => item.id != item_id)
        }
        let newData = {
            id: is_editing ? item_id : Date.now(),
            title: name,
            description: description,
            date: entry_date
        }
        oldEntry.push(newData);
        await new MyStorage().setEntry(JSON.stringify(oldEntry));
        setTimeout(() => {
            this.setState({
                show_loading: false
            })
            this.props.navigation.navigate('EntryList')
            // this.props.navigation.goBack();
        }, 200);
    }
    render() {
        const navigate = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <CustomBackHeader is_cross={true} show_backButton={true} nav={navigate} title={"Write"} is_delete={false} />

                <View style={{
                    flex: 1,
                    // marginHorizontal: scale(12),
                    backgroundColor: '#fff',
                    // marginTop: verticalScale(10),
                    paddingHorizontal: scale(12),
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderRadius: 8
                }}>
                    <TouchableOpacity onPress={() => this.showDatePicker()}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={[ENTRY_MAIN_COLOR, YELLOW_COLOR]} style={{
                                borderWidth: 1,
                                alignSelf: 'flex-end',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: verticalScale(4),
                                paddingHorizontal: scale(8),
                                borderRadius: scale(4),
                                borderColor: 'transparent',
                            }} >
                            <Text style={{
                                fontSize: scale(10),
                                alignSelf: "flex-start",
                                fontFamily: "BurlingamePro-CondSemiBold",
                                color: '#fff',
                            }}>
                                {typeof this.state.entry_date == 'string' ? moment(this.state.entry_date, 'YYYY-MM-DD').format('LL') : 'Pick Date'}
                            </Text>
                            <Icon
                                color={'#fff'}
                                name="chevron-thin-down"
                                type="entypo"
                                size={14}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                    {
                        this.createInputField(
                            0,
                            "Title",
                            true,
                            false,
                            "title",
                            this.state.name,
                            this.state.show_given_name_label,
                            "Title",
                            this.state.name_error,
                            this.state.show_name_error,
                            "default",
                            this.handleGivenName,
                            true
                        )
                    }
                    {/* {
                        this.createInputField(
                            2,
                            true,
                            true,
                            "date_picker",
                            this.state.entry_date,
                            this.state.show_date_label,
                            "Entry Date",
                            "",
                            false,
                            "default",
                            null,
                            false
                        )
                    } */}

                    {
                        this.createInputField(
                            1,
                            "Story",
                            false,
                            true,
                            "story",
                            this.state.description,
                            this.state.show_description_label,
                            "Write Something..",
                            this.state.description_error,
                            this.state.show_description_error,
                            "default",
                            this.handleDescription,
                            true
                        )
                    }
                    {
                        this.state.show_create_error &&
                        <ErrorText text_style={{}} error_text={this.state.create_error} />
                    }
                </View>
                <View style={{
                    paddingBottom: '8%',
                    paddingTop: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    backgroundColor: '#fff',
                    paddingHorizontal: scale(20)
                }}>
                    {/* <Icon
                        color={MAIN_GRAY}
                        name="camera"
                        type="entypo"
                        size={40}
                        containerStyle={{ marginRight: scale(12) }}
                    />
                    <Icon
                        color={MAIN_GRAY}
                        name="photo"
                        type="font-awesome"
                        size={40}
                        containerStyle={{ marginRight: scale(12) }}
                    /> */}
                    <GradientButton
                        button_label="Save"
                        color_one={ENTRY_MAIN_COLOR}
                        color_two={YELLOW_COLOR}
                        on_press={() => this.saveEntry()}
                        show_spinner={this.state.show_loading}
                        text_style={{
                            fontFamily: 'BurlingamePro-CondSemiBold',
                            fontSize: scale(13),
                            color: '#fff'
                        }}
                        custom_style={{
                            height: verticalScale(28),
                            paddingLeft: scale(18),
                            paddingRight: scale(18),
                            borderColor: 'transparent',
                            borderRadius: scale(22)
                        }}
                    />
                </View>
                {this.showDatePickerModal()}
            </View>
        );
    }
}
export default AddEntry;