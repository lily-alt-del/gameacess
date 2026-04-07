import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'react-native-web';
import Header from '../components/Header/Header.jsx';

export default function Page() {
    return (
        <View style={styles.container}>
            <Header />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        

    }
})