import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { activateKeepAwake } from 'expo-keep-awake';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo-ads-admob';

import Home from './src/screens/Home';
import Game from './src/screens/Game';
import HistoryList from './src/screens/HistoryList';
import gameList from './src/store/reducers/gameList';
import history from './src/store/reducers/history';
import dashboardReducer from './src/store/reducers/dashboard';


const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    gameList: gameList,
    history: history
});

const store = createStore(rootReducer, applyMiddleware(thunk));


let RootStack = createStackNavigator(
  {
    HistoryList: {
        screen: HistoryList,
        navigationOptions: {
            headerTitle: 'История'
        }
    },
    Game: {
        screen: Game,
        navigationOptions: {
            headerTitle: 'Игра'
        }
    },
    Home
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#313131',
            barStyle: 'dark-content',
            color: 'red',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'На главную',
        title: 'Деберц Харьков (Запись)',
    },
  }
);

let Navigation = createAppContainer(RootStack);

// Render the app container component with the provider around it
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    _activate = () => {
        activateKeepAwake();
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('./assets/fonts/Roboto-Black.ttf'),
            'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
        });
        this.setState({ loading: false });
        this._activate()
    }

    bannerAdReceived = () => {
        console.log('banner ad received')
    }

    bannerError = () => {
        console.log('banner ad not loading')
    }

    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }
        return (
            <Provider store={store}>
                <Navigation />
                <AdMobBanner
                    style={{paddingBottom: 20, backgroundColor: '#313131'}}
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-4065129637072044/4809690931" // banner
                    onDidFailToReceiveAdWithError={this.bannerError}
                    onAdViewDidReceiveAd = {this.bannerAdReceived}
                />
            </Provider>
        );
    }
}
