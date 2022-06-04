import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { ENTRY_COLOR, ENTRY_MAIN_COLOR, LIGHT_GRAY, ONYX_COLOR, PRIMARY_COLOR, YELLOW_COLOR } from '../../../assets/color';
import { Icon } from 'react-native-elements';
import ErrorText from '../helpers/ErrorText';
import GradientButton from '../helpers/gradientButton';
import MyStorage from '../helpers/MyStorage';
import { scale, verticalScale } from '../helpers/Scaling';
import { validateEmail } from '../helpers/validations';
interface State {
    email: string;
    password: string;
    loading: boolean;
    btn_text: string;
    confirm_password: string;
    match_email: string;
    match_password: string;
    show_email_error: boolean;
    show_password_error: boolean;
    email_error: string;
    password_error: string;
    show_credential_error: boolean;
    credential_error: string;
    eye_icon_value: string;
    show_password: boolean;
}
interface Props {
    navigation: any;
}
export default class LoginView extends React.Component {
    state: State;
    props: Props;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            loading: false,
            btn_text: "",
            match_email: "",
            match_password: "",
            show_email_error: false,
            show_password_error: false,
            show_credential_error: false,
            email_error: '',
            password_error: '',
            credential_error: '',
            eye_icon_value: 'eye-with-line',
            show_password: true
        }
    }
    componentDidMount() {
        const storage = new MyStorage();
        storage.getEmail().then(email => {
            if (email) {
                this.setState({
                    btn_text: 'LOGIN',
                    match_email: email
                })
                storage.getPassword().then(password => {
                    this.setState({
                        match_password: password
                    })
                })
            } else {
                this.setState({
                    btn_text: 'SIGN UP'
                })
            }
        })
    }
    loginUser = async () => {
        const storage = new MyStorage();
        const {
            email, password, match_email,
            match_password, } = this.state;
        if (email.trim() == '') {
            this.setState({
                show_email_error: true,
                email_error: 'please enter email'
            })
            return
        }
        var valid = validateEmail(email);
        if (!valid) {
            this.setState({
                show_email_error: true,
                email_error: 'please enter valid email'
            })
            return
        }
        if (password.trim() == '') {
            this.setState({
                show_password_error: true,
                password_error: 'please enter password'
            })
            return
        }
        this.setState({ loading: true })
        if (email && password) {
            if (match_email && match_password) {
                if (email == match_email &&
                    password == match_password) {
                    this.setState({ loading: false });
                    this.props.navigation.navigate('EntryList')
                } else {
                    this.setState({ loading: false, show_credential_error: true, credential_error: 'The email or password you entered is incorrect.' });
                    // alert('The email or password you entered is incorrect.')
                }
            } else {
                await storage.setEmail(email);
                await storage.setPassword(password);
                this.setState({ loading: false });
                this.props.navigation.navigate('EntryList');
            }
        }
    }
    handleEmail = (text) => {
        this.setState({
            email: text.toLowerCase(),
            show_email_error: false,
            show_credential_error: false
        })
    }
    handlePassword = (text) => {
        this.setState({
            password: text,
            show_password_error: false,
            show_credential_error: false
        })
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: '10%'
                }}
            >
                <Text style={{
                    fontFamily: 'BurlingamePro-CondBold',
                    color: ENTRY_MAIN_COLOR,
                    fontSize: scale(38),
                    paddingBottom: verticalScale(28)
                }}><Text style={{ color: YELLOW_COLOR }}>Diary</Text></Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        value={this.state.email}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        keyboardType={'email-address'}
                        placeholderTextColor={ONYX_COLOR}
                        onChangeText={text => this.handleEmail(text)} />
                </View>
                {
                    this.state.show_email_error &&
                    <ErrorText text_style={{ alignSelf: 'flex-start', marginLeft: scale(40) }} error_text={this.state.email_error} />
                }
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry={this.state.show_password}
                        style={styles.inputText}
                        autoCorrect={false}
                        value={this.state.password}
                        autoCapitalize={'none'}
                        placeholder="Password"
                        placeholderTextColor={ONYX_COLOR}
                        onChangeText={text => this.handlePassword(text)} />
                    <Icon
                        color={ONYX_COLOR}
                        onPress={() => {
                            const that = this
                            var promise = new Promise(function (resolve, reject) {
                                that.setState({ show_password: !that.state.show_password })
                                resolve(true);
                            })
                            promise.then(bool => {
                                if (that.state.show_password) {
                                    that.setState({
                                        eye_icon_value: 'eye-with-line'
                                    })
                                } else {
                                    that.setState({
                                        eye_icon_value: 'eye'
                                    })
                                }
                            })
                        }}
                        name={this.state.eye_icon_value}
                        type="entypo"
                        size={20}
                    />
                </View>
                {
                    this.state.show_password_error &&
                    <ErrorText
                        text_style={{ alignSelf: 'flex-start', marginLeft: scale(40) }}
                        error_text={this.state.password_error}
                    />
                }
                {
                    this.state.show_credential_error &&
                    <ErrorText
                        text_style={{ alignSelf: 'flex-start', marginLeft: scale(40) }}
                        error_text={this.state.credential_error}
                    />
                }
                {
                    this.state.btn_text == 'SIGN UP'
                    &&
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry={this.state.show_password}
                            style={styles.inputText}
                            autoCorrect={false}
                            value={this.state.confirm_password}
                            autoCapitalize={'none'}
                            placeholder="Confirm Password"
                            placeholderTextColor={ONYX_COLOR}
                            onChangeText={text => this.setState({ confirm_password: text })} />
                    </View>
                }
                <GradientButton
                    button_label={this.state.btn_text}
                    color_one={ENTRY_MAIN_COLOR}
                    color_two={YELLOW_COLOR}
                    on_press={() => {
                        // this.props.navigation.navigate('EntryList')
                        this.loginUser();
                    }}
                    show_spinner={this.state.loading}
                    text_style={{
                        fontFamily: 'BurlingamePro-SemiBold',
                        color: '#fff',
                        paddingHorizontal: scale(60),
                        fontSize: scale(16)
                    }}
                    custom_style={{
                        // backgroundColor: MAIN_GRAY,
                        borderWidth: 1,
                        marginTop: verticalScale(12),
                        borderColor: ENTRY_COLOR,
                        height: verticalScale(32.5),
                        borderRadius: scale(24)
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: ENTRY_MAIN_COLOR,
        marginBottom: 30
    },
    inputView: {
        width: "80%",
        backgroundColor: LIGHT_GRAY,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginTop: 20,
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
    },
    inputText: {
        height: 50,
        width: "90%",
        fontFamily: 'BurlingamePro-Medium',
        fontSize: 16,
        color: ONYX_COLOR
    },
    loginBtn: {
        width: "80%",
        backgroundColor: ENTRY_MAIN_COLOR,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        // marginBottom: 10,
    },
    loginText: {
        color: '#fff',
        fontFamily: 'BurlingamePro-Bold',
        fontSize: 16
    },
    singUpText: {
        color: PRIMARY_COLOR,
        fontFamily: 'BurlingamePro-Bold',
        fontSize: 16
    }
});