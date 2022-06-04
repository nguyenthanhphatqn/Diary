import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ENTRY_MAIN_COLOR, LIGHT_GRAY, MAIN_GRAY, ONYX_COLOR } from "../../../assets/color";
import { Calendar } from 'react-native-calendars';
import { scale, verticalScale } from '../helpers/Scaling';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import PureRow from '../helpers/PureRow';
import FloatingButton from '../helpers/FloatingButton';
import MyStorage from '../helpers/MyStorage';
interface MarkedDateItem {
    customStyles: {
        container: {
            borderColor?: string,
            borderWidth?: number,
            backgroundColor?: string
        },
        text: {
            fontSize?: number,
            color?: string
        }
    }
}
interface EntryListItem {
    title: string;
    time: string;
    description: string;
}
interface State {
    entryList: Array<EntryListItem>;
    no_slots_available: boolean;
    markedDates: Map<string, MarkedDateItem>;
    EntryWithDates: Map<string, Array<EntryListItem>>;
    empty_message: string;
}
interface Props {
    navigation: any;
}
const entryListStatic = []
class EntryCalendar extends Component {
    state: State;
    props: Props;
    entryListStatic: [];
    _unsubscribe: any;
    constructor(props) {
        super(props);
        this.state = {
            entryList: [],
            no_slots_available: false,
            markedDates: new Map<string, MarkedDateItem>(),
            EntryWithDates: new Map<string, Array<EntryListItem>>(),
            empty_message: ''
        };
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setDataOnFocus();
        })
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    setDataOnFocus = async () => {
        const storage = new MyStorage();
        let oldEntryWithDates = new Map<string, Array<EntryListItem>>()
        await storage.getEntry().then(entry => {
            JSON.parse(entry).map((item) => {
                const tempEntry = oldEntryWithDates.get(item.date)
                if (tempEntry) {
                    oldEntryWithDates.set(item.date, [...tempEntry, item])
                } else {
                    oldEntryWithDates.set(item.date, [item])
                }
                const found = entryListStatic.some(el => el.id === item.id);
                if (!found) entryListStatic.push(item);
            })
        })
        this.setState({
            EntryWithDates: oldEntryWithDates,
            entryList: oldEntryWithDates.get(moment().format('YYYY-MM-DD'))
        })
        this.markedDates(oldEntryWithDates, moment().format('YYYY-MM-DD'))
    }
    markedDates = (_value, selected_date) => {
        let markedDates = new Map<string, MarkedDateItem>()
        for (const key of _value.keys()) {
            if (key == selected_date) {
                markedDates.set(key, {
                    customStyles: {
                        container: {
                            backgroundColor: ENTRY_MAIN_COLOR
                        },
                        text: {
                            color: 'white'
                        }
                    }
                })
            } else {
                markedDates.set(key, {
                    customStyles: {
                        container: {
                            // elevation: 4,
                            borderColor: ENTRY_MAIN_COLOR,
                            borderWidth: 2
                        },
                        text: {
                            fontSize: 11,
                            color: 'black'
                        }
                    }
                })
            }
        }
        if (!markedDates.get(selected_date)) {
            markedDates.set(selected_date, {
                customStyles: {
                    container: {
                        backgroundColor: ENTRY_MAIN_COLOR
                    },
                    text: {
                        color: 'white'
                    }
                }
            })
        }
        this.setState({
            markedDates
        })
    }
    onDayPress = (value) => {
        if (this.state.EntryWithDates.get(value.dateString)) {
            this.setState({
                entryList: this.state.EntryWithDates.get(value.dateString)
            })

        } else {
            this.setState({
                entryList: [],
                empty_message: `Don't have any story for ${moment(value.dateString, 'YYYY-MM-DD').format('LL')}`
            })
        }
        this.markedDates(this.state.EntryWithDates, value.dateString);
    }
    _renderRowItem = ({ item, index }) => (
        <PureRow item={item} index={index} nav={this.props.navigation} title="Entry" navigation={undefined} navigate={undefined} id={0} />
    )
    createSlot = (time) => {
        return (
            <TouchableOpacity
                key={time}
                onPress={() => {
                    this.setState({ selected_time: time, slot_error: false })
                }}
                style={{
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 14,
                    marginVertical: verticalScale(4),
                    borderColor: LIGHT_GRAY,
                    paddingVertical: verticalScale(8),
                    marginHorizontal: scale(12)
                }}>
                <Text style={{
                    fontFamily: 'BurlingamePro-Medium',
                    fontSize: scale(12)
                }}>{time}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (<View style={{ flex: 1 }}>
            <View style={{
                flexDirection: "row",
                marginTop: verticalScale(25),
                marginHorizontal: scale(12),
                marginVertical: verticalScale(10)
            }} >
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    this.state.markedDates
                    &&
                    <Calendar
                        style={{
                            marginBottom: verticalScale(4),
                            marginHorizontal: scale(12),
                            borderRadius: scale(4),
                            shadowColor: ENTRY_MAIN_COLOR,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                        }}
                        theme={{
                            arrowStyle: {
                                backgroundColor: 'transparent',
                                padding: 10
                            },
                            arrowColor: MAIN_GRAY,
                            monthTextColor: ENTRY_MAIN_COLOR,
                            textMonthFontWeight: 'bold',
                            textMonthFontSize: 20,
                        }}
                        onMonthChange={(month) => {
                            this.setState({
                                availableSlots: []
                            })
                        }}
                        onDayPress={this.onDayPress}
                        hideExtraDays
                        markingType={'custom'}
                        markedDates={Object.fromEntries(this.state.markedDates)}
                    />
                }
                {
                    this.state?.entryList?.length > 0
                        ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            disableVirtualization={false}
                            data={this.state.entryList}
                            renderItem={this._renderRowItem}
                            contentContainerStyle={{ marginTop: verticalScale(8) }}
                            keyExtractor={item => item.title + ""}
                        />
                        :
                        <View style={{
                            flex: 1,
                            marginTop: verticalScale(8),
                            alignItems: 'center',
                            marginHorizontal: scale(28)
                        }}>
                            {
                                this.state.empty_message
                                    ?
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: "BurlingamePro-CondBold",
                                        fontSize: scale(14),
                                        color: ONYX_COLOR

                                    }}>
                                        {this.state.empty_message}
                                    </Text>
                                    :
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
                                        }}>{`\nPlease add your stories. You will see them in calendar`}</Text>
                                    </Text>


                            }

                        </View>
                }
            </ScrollView>
            <FloatingButton on_press={() => { this.props.navigation.navigate('AddEntry') }} />
        </View>
        );
    }
}
export default EntryCalendar;