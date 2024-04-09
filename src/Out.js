import { View, Text } from "react-native";
import Layout from "./layout/Layout";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import tw from 'twrnc';

export default function Outdoor() {
     return (
       <Layout>
         <View >
             <ExpoStatusBar style="light" />
               <Text  >Outdoor!</Text>
       </View>
       </Layout>
     );
   }
