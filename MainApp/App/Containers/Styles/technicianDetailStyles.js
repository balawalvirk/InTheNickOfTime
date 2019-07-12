import { StyleSheet, Image, ScrollView, TextInput, Picker, ImageBackground } from 'react-native';
import { totalSize, height, width } from 'react-native-dimension';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    profilePic: {
        height: totalSize(15),
        width: totalSize(15),
        borderRadius: 100,
    },
    profilePicReivew: {
        height: totalSize(5),
        width: totalSize(5),
        borderRadius: 100,
        marginHorizontal: 8
    },
    topContainer: {
        width: width(90),
        height: height(20),
        backgroundColor: 'white',
        marginTop: height(4),
        flexDirection: 'row',
        elevation: 5,
        borderRadius: 5
        //alignItems:'center',
        //justifyContent:'center',

    },
    iconContainer: {
        width: width(20),
        //backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtContainer: {
        //flex:1,
        width: width(90),
        //backgroundColor: 'yellow',
        justifyContent: 'center',
        marginTop: height(2)

    },
    lowerContainer: {
        width: width(100),
        flex: 1,
        //backgroundColor: 'orange',
        alignItems: 'center',
        //justifyContent: 'center'
    },



    txtLarg: {
        fontSize: totalSize(4),
        //textAlign: 'center',
        //margin: 10,
        color: 'rgb(66,67,69)',
        fontWeight: 'bold',
        //opacity: 0.6
    },
    txtSmall: {
        fontSize: totalSize(1.5),
        //textAlign: 'center',
        color: 'rgb(66,67,69)',
        fontWeight: 'normal'
        //color: 'rgb(217,217,217)',
        //marginBottom: 5,
    },
    detailContainer: {
        width: width(95),
        // height: height(15),
        backgroundColor: 'blue',
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 5,
        borderRadius: 5
        //justifyContent: 'center'
    },
    iconContainerSmall: {
        width: totalSize(5),
        height: totalSize(5),
        backgroundColor: 'green',
        justifyContent: 'center',
        marginHorizontal: width(2),
        //marginVertical:height(2),
        borderRadius: 100,
        backgroundColor: 'rgb(66,67,69)',

    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red'
    },
    button: {
        height: height(6),
        width: width(30),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.SPA_redColor,
        elevation: 5,
        //marginVertical: height(4),
        //flexDirection: 'row'
    },
    buttonModal: {
        height: height(6),
        width: width(80),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.SPA_redColor,
        elevation: 5,
        borderRadius: 5,
        marginVertical: height(4),
        //flexDirection: 'row'
    },
    buttonTxt: {
        color: 'white',
        //marginVertical:height(2),
        //marginHorizontal: width(10),
        fontSize: totalSize(2),

    },
    modalHeader: {
        backgroundColor: colors.SPA_redColor,
        height: height(6),
        width: width(90),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    modalBody: {
        backgroundColor: 'white',
        width: width(90),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    starTxtContainer: {
        flexDirection: 'row',
        marginVertical: height(2),
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputTxtContainer: {
        //backgroundColor:'orange'
    },
    commentInputView: {
        height: height(30),
        width: width(80),
        //borderWidth: 0.25,
        backgroundColor: 'white',
        elevation: 5,
        //borderColor: 'rgb(66,67,69)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    commentInput: {
        height: height(30),
        width: width(75),
        textAlignVertical: "top"
        //borderWidth: 0.5,
        //backgroundColor:'blue',
        //paddingBottom: height(25)
    },
    btnTxtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: totalSize(2.5),
        color: 'white',

    },

    schoolInputContainer: {
        flexDirection: 'row',
        width: width(90),
        height: height(8),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        backgroundColor: 'white',
        //backgroundColor: 'rgb(0,173,238)',
        //marginBottom: height(1),
        elevation: 10,
        borderRadius: 5,
        marginVertical: height(1)
    },
    TxtInput: {
        width: width(80),
        height: height(8),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
        fontSize: totalSize(2.5),
        //color: 'rgb(217,217,217)'
        //marginVertical:height(2),
        //borderRadius: 25,
    },
    lowerContainer: {
        flex: 1,
        //width: width(100),
        //height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red'
        //backgroundColor: 'rgb(217,217,217)'
        // backgroundColor: 'rgb(0,173,238)'
        //backgroundColor:'rgb(180,210,53)'
    },

    PickerStyle: {
        width: width(75),
        height: height(8),
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'white',
        //fontSize: totalSize(2.5),
        color: 'rgb(66,67,69)'
        //marginVertical:height(2),
        //borderRadius: 25,
    },
})