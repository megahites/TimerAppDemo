import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform
} from 'react-native';

// importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

const TimerComponent = () => {
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    
    const options = {
        container: {
            backgroundColor: "transparent",
            height: 50,
            alignItems:"center",
            
        },
        text: {
            fontSize:  Platform.OS == "ios" ? 28 : 18,
            textAlign: "center",
            textColor:"white",
        }
    }
    return (
        
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.sectionStyle}>
                    <Stopwatch
                        laps
                        msecs
                        start={isStopwatchStart}
                        // To start
                        reset={resetStopwatch}
                        // To reset
                        options={options}
                        // Options for the styling
                        getTime={(time) => {
                            console.log(time);

                        }}
                    />
                    <TouchableHighlight
                        style={{
                            width: 100,
                            height: Platform.OS == "ios" ? 26 : 34,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                            backgroundColor: !isStopwatchStart ? "green" : "red"
                        }}
                        onPress={() => {
                            setIsStopwatchStart(!isStopwatchStart);
                            setResetStopwatch(false);
                        }}>
                        <Text style={[styles.buttonText]}>
                            {!isStopwatchStart ? 'START' : 'STOP'}
                        </Text>
                    </TouchableHighlight>

                </View>
 
            </View>
        </SafeAreaView>
    );
};

export default TimerComponent;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    sectionStyle: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        textAlign:"center"
    },

    stopButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 100,
        backgroundColor: 'red',

    },

    countDown: {
        backgroundColor: "transparent",
        height: 50,
    },

});

const options = {
    container: {
        backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginLeft: 7,
        textAlign:"center"
    },
};