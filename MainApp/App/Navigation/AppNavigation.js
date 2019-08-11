

import { createStackNavigator, createAppContainer } from 'react-navigation'
import Splash from '../Containers/splash';
import Login from '../Containers/LoginFlow/login';
import SignUp from '../Containers/LoginFlow/signup';
import SignUpTechnician from '../Containers/LoginFlow/signupTechnician';
import ClientTab from '../Containers/ApplicationTabs/ClientTab';
import Notification from '../Containers/MainFlow/Client/Notification/notification';
import TechnicianTab from '../Containers/ApplicationTabs/TechnicianTab';
import MyPortfolio from '../Containers/MainFlow/Technician/Home/myPortfolio';
import MyServices from '../Containers/MainFlow/Technician/Home/myServices';
import NotificationTechnician from '../Containers/MainFlow/Technician/Notification/notificationTechnician';
import EditProfileTechnician from '../Containers/MainFlow/Technician/Profile/editProfileTechnician';
import EditProfileClient from '../Containers/MainFlow/Client/Profile/editProfileClient';
import SearchTechnician from '../Containers/MainFlow/Client/Home/searchTechnician';
import TechniciansList from '../Containers/MainFlow/Client/Home/technicianList';
import TechnicianDetailTab from '../Containers/ApplicationTabs/TechnicianDetailTopTab';
import Payment from '../Containers/MainFlow/Client/Home/TechnicianDetail/payment';
import WebViewOpensLink from './../Containers/MainFlow/Client/Settings/WebViewOpensLink';
import CardData from './../Containers/MainFlow/Client/Home/TechnicianDetail/CardData'
import { Card } from 'react-native-elements';

const AppNavigator = createStackNavigator({
    splash: {
        screen: Splash
    },
    login: {
        screen: Login
    },
    signupClient: {
        screen: SignUp
    },
    signUpTechnician: {
        screen: SignUpTechnician
    },
    notificationClient: {
        screen: Notification
    },
    notificationTechnician: {
        screen: NotificationTechnician
    },
    clientTab: {
        screen: ClientTab,
        navigationOptions: {
            header: null
        }
    },
    searchTechnician: {
        screen: SearchTechnician
    },
    techniciansList: {
        screen: TechniciansList
    },
    technicianDetailTab: {
        screen: TechnicianDetailTab,
        navigationOptions: {
            title: 'Technician Detail',
        }
    },
    editProfileClient: {
        screen: EditProfileClient
    },
    technicianTab: {
        screen: TechnicianTab,
        navigationOptions: {
            header: null
        }
    },
    myServices: {
        screen: MyServices
    },
    portfolio: {
        screen: MyPortfolio
    },
    editProfileTechnician: {
        screen: EditProfileTechnician
    },
    payment: {
        screen: Payment
    },
    WebViewOpensLink: {
        screen: WebViewOpensLink
    },
    cardData: {
        screen: CardData
    }

},
    {
        initialRouteName: 'splash',
    })

export default createAppContainer(AppNavigator);
