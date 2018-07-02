import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}
function createNotification() {
	return {
		title: 'Are You Ready for a Study Session?',
		body: 'Spend 5 Minutes With Your UdaciCards Decks!',
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}
export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if(data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if(status === 'granted') {
							Notifications.cancelAllScheduledNotifcationsAsync()

							let tomorrow = new Date();
							tomorrow.setDate(tmorrow.getDate() + 1)
							tomorrow.setHours(12)
							tomorrow.setMinutes(0)

							Notifications.scheduleLocalNotificationAsync(createNotification(), {
								time: tomorrow,
								repeat: 'day',
							})

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}