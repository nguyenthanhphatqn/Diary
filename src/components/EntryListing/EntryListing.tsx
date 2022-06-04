import React, { Component } from 'react';
import { StyleSheet, Button,View, FlatList, Text, Alert } from 'react-native';
import PureRow from '../helpers/PureRow';
import { scale, verticalScale } from '../helpers/Scaling';
import FloatingButton from '../helpers/FloatingButton';
import MyStorage from '../helpers/MyStorage';
import { ENTRY_MAIN_COLOR, LIGHT_GRAY, MAIN_GRAY, ONYX_COLOR, PRIMARY_COLOR, YELLOW_COLOR } from '../../../assets/color';
import GradientButton from '../helpers/gradientButton';

interface State {
    entryList: any;
}
interface Props {
    navigation: any;
    isFocused: boolean;
}

const entryListStatic = [];
class EntryListing extends Component {
    state: State;
    props: Props;
    entryList: any[];
    _unsubscribe: any;
    constructor(props) {
        super(props);
        this.state = {
            entryList: []
        };
    }
    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                entryList: []
            })
            this.setDataOnFocus();
        })
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    setDataOnFocus = async () => {
        let tempList = []
        const storage = new MyStorage();
        // storage.removeItem('entry_list')
        await storage.getEntry().then(entry => {
            if (entry)
                JSON.parse(entry).map((item) => {
                    const found = tempList.some(el => el.id === item.id);
                    if (!found) tempList.push(item);
                })
        })
        this.setState({
            entryList: tempList
        })
    }
    _renderRowItem = ({ item, index }: { item: any, index: number }) => (
        <PureRow item={item} index={index} nav={this.props.navigation} title="Entry" navigation={undefined} navigate={undefined} id={0} />
    )
    render() {
        const navigate = this.props.navigation
        return (
            <View style={{ flex: 1, paddingTop: verticalScale(20), backgroundColor: '#fff' }}>
                   <GradientButton
                        button_label="LOGOUT"
                        color_one={ENTRY_MAIN_COLOR}
                        color_two={YELLOW_COLOR}
                        on_press={() => {
                            this.props.navigation.navigate('LoginView')}}
                        text_style={{
                            fontFamily: 'BurlingamePro-CondSemiBold',
                            fontSize: scale(13),
                            color: '#fff'
                        }}
                        custom_style={{
                            width: "21%",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 45,
                            left: 310,
                            paddingLeft: scale(5),
                            paddingRight: scale(5),
                            borderColor: 'transparent',
                            borderRadius: scale(10)
                        }}
                    />
                {
                    
                    this.state.entryList.length > 0
                        ?
                        
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            disableVirtualization={false}
                            data={this.state.entryList}
                            renderItem={this._renderRowItem}
                            contentContainerStyle={{ marginTop: verticalScale(16), paddingBottom: verticalScale(20) }}
                            keyExtractor={item => item.title + ""}
                        />
                        :
                        <View style={{
                            flex: 1,
                            marginTop: verticalScale(46),
                            alignItems: 'center',
                            marginHorizontal: scale(16)
                        }}>
                         
                            <Text style={{
                                fontFamily: 'BurlingamePro-CondBold',
                                color: ENTRY_MAIN_COLOR,
                                fontSize: scale(38),
                                paddingBottom: verticalScale(8)
                            }}><Text style={{ color: YELLOW_COLOR }}>Diary</Text></Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: "BurlingamePro-CondBold",
                                fontSize: scale(14),
                                color: ONYX_COLOR

                            }}>
                                <Text style={{
                                    marginTop: verticalScale(4),
                                    fontFamily: "BurlingamePro-CondSemiBold",
                                    color: MAIN_GRAY
                                }}>{`\nPlease add your stories.`}</Text>
                            </Text>
                        </View>
                }
               
                <FloatingButton on_press={() => {
                    this.props.navigation.navigate('AddEntry')
                }} />
            </View>
        );
    } 
}
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     logo: {
//         fontWeight: "bold",
//         fontSize: 50,
//         color: ENTRY_MAIN_COLOR,
//         marginBottom: 30
//     },
//     inputView: {
//         width: "80%",
//         backgroundColor: LIGHT_GRAY,
//         borderRadius: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 50,
//         marginTop: 20,
//         justifyContent: 'space-between',
//         paddingHorizontal: scale(10),
//     },
//     inputText: {
//         height: 50,
//         width: "90%",
//         fontFamily: 'BurlingamePro-Medium',
//         fontSize: 16,
//         color: ONYX_COLOR
//     },
//     loginBtn: {
//         width: "80%",
//         backgroundColor: ENTRY_MAIN_COLOR,
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 40,
//         // marginBottom: 10,
//     },
//     loginText: {
//         color: '#fff',
//         fontFamily: 'BurlingamePro-Bold',
//         fontSize: 16
//     },
//     singUpText: {
//         color: PRIMARY_COLOR,
//         fontFamily: 'BurlingamePro-Bold',
//         fontSize: 16
//     }
//   });
export default EntryListing;