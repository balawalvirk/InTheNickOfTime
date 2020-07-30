import React, {
    Component
} from 'react'
import {
    Modal,
    ActivityIndicator,
    Text,
    View,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import styles from './styles'

export default class Loader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            text: this.props.text ? this.props.text : 'Please wait...'
        }
    }

    show = () => {
        if (this.state.visible === false) {
            this.setState(p => {
                return {
                    ...p,
                    visible: true
                }
            })
        }
    }

    hide = () => {
        if (this.state.visible === true) {
            this.setState(p => {
                return {
                    ...p,
                    visible: false
                }
            })
        }
    }

    render() {
        return (
            <Modal animated={true} animationType='fade' visible={this.state.visible} transparent={true} style={styles.modal}>
                <StatusBar hidden={true} />
                <TouchableOpacity activeOpacity={1} style={styles.background}>
                    <View style={styles.section}>
                        <ActivityIndicator size='small' color={this.props.color ? this.props.color : '#0093F7'} />
                        <Text style={styles.loaderText}>
                            {this.state.text}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}