import {
    StyleSheet
} from 'react-native'
import vh from './Units/vh';
import vw from './Units/vw';

export default styles = StyleSheet.create({
    modal: {
        width: 100 * vw,
        height: 100 * vh,
    },
    background: {
        width: 100 * vw,
        height: 100 * vh,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    section: {
        backgroundColor: 'white',
        width: 65 * vw,
        height: 15 * vh,
        borderRadius: 3 * vw,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loaderText: {
        fontSize: 2.5 * vh,
        marginLeft: 5 * vw
    },
})