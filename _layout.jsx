import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
  return (
    <Tabs
        tabBar={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home"
            }}
        />
        <Tabs.Screen
            name="qrcode"
            options={{
                title: "Qrcode"
            }}
        />
        <Tabs.Screen
            name="News"
            options={{
                title: "News"
            }}
        />
        <Tabs.Screen
            name="History"
            options={{
                title: "History"
            }}
        />
    </Tabs>
  )
}

export default _layout