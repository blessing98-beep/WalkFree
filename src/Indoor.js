import { View, Text } from "react-native";
import Layout from "./layout/Layout";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import tw from 'twrnc';

export default function Indoor() {
     return (
       <Layout>
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Indoor!</Text>
       </View>
       </Layout>
     );
}