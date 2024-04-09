import { View, Text, StyleSheet, Platform, StatusBar } from "react-native"

const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            {/* <Text>hkalhkhkljshdfa</Text> */}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
});

export default Layout