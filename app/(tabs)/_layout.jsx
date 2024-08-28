import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../../components/TabBar';
import CustomHeader from '../../components/layout/Header';

const _layout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <CustomHeader />
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: "Qrcode",
          header: () => <CustomHeader />
        }}
      />
      <Tabs.Screen
        name="News"
        options={{
          title: "News",
          header: () => <CustomHeader />
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          title: "History",
          header: () => <CustomHeader />
        }}
      />
    </Tabs>
  );
};

export default _layout;