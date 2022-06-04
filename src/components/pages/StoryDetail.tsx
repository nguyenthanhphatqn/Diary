import React, { Component } from 'react';
import { View, Text, Platform, ScrollView } from 'react-native';
import moment from 'moment';
import { ENTRY_MAIN_COLOR, ONYX_COLOR } from "../../../assets/color";
import CustomBackHeader from '../helpers/CustomHeaderBackButton';
import { scale, verticalScale } from '../helpers/Scaling';
import FloatingButton from '../helpers/FloatingButton';
import MyStorage from '../helpers/MyStorage';
interface Props {
    navigation: any;
    route: any;
}
class StoryDetail extends Component {
    props: Props;

    constructor(props) {
        super(props);
    }
    deleteEntry = async () => {
        let { item } = this.props.route.params
        const storage = new MyStorage();
        await storage.getEntry().then(async entry => {
            if (entry) {
                let oldList = JSON.parse(entry);
                oldList = oldList.filter(fItem => fItem.id != item.id)
                await storage.removeItem('entry_list') 
                await new MyStorage().setEntry(JSON.stringify(oldList));
                this.props.navigation.navigate('EntryList')
            }
        })
    }
    render() {
        const navigate = this.props.navigation
        let { item } = this.props.route.params
        return (
            <View style={{ flex: 1 }}>
                <CustomBackHeader show_backButton={true} nav={navigate} title={"Diary"} delete_pressed={this.deleteEntry} is_delete={true}/>
                <ScrollView style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingTop: verticalScale(12),
                    paddingHorizontal: scale(18),
                }}>
                    <Text style={{
                        color: ENTRY_MAIN_COLOR,
                        fontSize: scale(12),
                        fontFamily: "BurlingamePro-CondSemiBold",
                    }}>{moment(item.date).format('dddd, DD MMM YYYY')}</Text>
                    <Text style={{
                        marginTop: verticalScale(4),
                        color: ONYX_COLOR,
                        fontSize: scale(16),
                        fontFamily: "BurlingamePro-CondBold",
                    }}>{item.title}</Text>
                    <Text style={{
                        marginTop: verticalScale(4),
                        color: '#595959',
                        fontSize: scale(12),
                        fontFamily: "BurlingamePro-Medium",
                    }}>{item.description}</Text>
                </ScrollView>
                <FloatingButton icon={"edit"} on_press={() => { this.props.navigation.navigate('AddEntry', { item: item }) }} />
            </View>
        );
    }
}
export default StoryDetail;