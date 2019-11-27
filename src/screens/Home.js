import React  from 'react';
import { View, Image, StyleSheet }  from 'react-native';
import { Button } from 'react-native-material-ui';

const Home = ({navigation}) => {
    return (
        <View  style={{flex:1, backgroundColor: '#313131'}}>
            <View style={{flex: 3}}>
                <Image style={styles.canvas} resizeMode="contain" source={require('../../assets/deberts.png')} alt="Деберц (Запись)"/>
            </View>
            <View style={styles.buttons}>
                <Button onPress={() => navigation.navigate('Game', {'newGame': true})} raised primary text='Новая игра'  />
                <Button onPress={() => navigation.navigate('Game')} raised accent secondary style={styles.button} text='Последняя игра'  />
                <Button onPress={() => navigation.navigate('HistoryList')} raised secondary text='История'  />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    canvas: {
        flex:1,
        width: '100%',
    },
    buttons: {
        flex: 2,
        justifyContent: 'space-around',
        marginBottom: 50,
        position: 'relative'
    },
    button: {
        marginBottom: 10
    },
});

export default Home;