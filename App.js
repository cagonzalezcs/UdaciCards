import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Platform } from 'react-native'
import {
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import  { Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckItem from './components/DeckItem'
import DeckQuiz from './components/DeckQuiz'
import AddNewCard from './components/AddNewCard'
import { orange, yellow, white } from './utils/colors'
import { setLocalNotification } from './utils/notifications'


function UdaciCardsStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = Platform.OS === 'ios' ?
    createBottomTabNavigator (
        {
            DeckList: {
                screen: DeckList,
                navigationOptions: {
                    tabBarLabel: 'My Decks',
                    tabBarIcon: ({ tintColor }) => <Ionicons name='logo-buffer' size={30} color={tintColor} />
                },
            },
            AddDeck: {
                screen: AddDeck,
                navigationOptions: {
                    tabBarLabel: 'Add Deck',
                    tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
                }
            }
        },
        {
            navigationOptions: {
                header: null
            },
            tabBarOptions: {
                activeTintColor: orange,
                style: {
                    height: 56,
                    backgroundColor: white,
                    shadowColor: 'rgba(0, 0, 0, 0.24)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 6,
                    shadowOpacity: 1,
                }
            }
        }
    ) :
    createMaterialTopTabNavigator (
        {
            DeckList: {
                screen: DeckList,
                navigationOptions: {
                    tabBarLabel: 'My Decks',
                     tabBarIcon: ({ tintColor }) => <Ionicons name='logo-buffer' size={30} color={tintColor} />
                },
            },
            AddDeck: {
                screen: AddDeck,
                navigationOptions: {
                    tabBarLabel: 'Add Deck',
                     tabBarIcon: ({ tintColor }) => <Ionicons name='logo-buffer' size={30} color={tintColor} />
                }
            }
        },
        {
            navigationOptions: {
                header: null
            },
            tabBarOptions: {
                activeTintColor: white,
                indicatorStyle: {
                    backgroundColor: yellow
                },
                style: {
                    height: 56,
                    backgroundColor: orange,
                    shadowColor: 'rgba(0, 0, 0, 0.24)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 6,
                    shadowOpacity: 1,
                }
            }
        }
    )

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: () => ({
            header: null
        })
    },
    DeckItem: {
        screen: DeckItem,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: orange
            },
        }
    },
    DeckQuiz: {
        screen: DeckQuiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: orange
            },
        }
    },
    AddNewCard: {
        screen: AddNewCard,
        navigationOptions: {
            title: 'Add New Card',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: orange
            },
        }
    },
})

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <UdaciCardsStatusBar backgroundColor={orange} barStyle='light-content' />
                <MainNavigator />
            </View>
        )
    }
}
