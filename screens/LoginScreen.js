
import React, {Component, Button, useState, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { 
    View, 
    Image, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ImageBackground,
} from 'react-native';

import logo from '../images/logo.png';
import background from '../images/background.jpg';
import auth from '@react-native-firebase/auth';
import { 
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

function signInUser(email, password) {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
         })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }

    console.error(error);
  });
}


function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

        return (
            <>

                    <ImageBackground 
                        source={ require('../images/background.jpg') }
                        resizeMode='cover' 
                        style={styles.backgroundImage}
                        imageStyle={{opacity: 0.2}}
                        >
                            <View style={styles.logoContainer}>
                                <Image source={logo} style={styles.image} />
                            </View>
                            <View style={styles.userInput}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Email address"
                                    placeholderTextColor="#fff"
                                    onChangeText={
                                        text => setEmail(text)
                                    }
                                />       
                            </View>
                            <View style={styles.userInput}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Password"
                                    placeholderTextColor="#fff"
                                    secureTextEntry={true}
                                    onChangeText={
                                        text => setPassword(text)
                                    }
                                />       
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={() => signInUser(email, password)}>
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Forgot Password</Text>
                            </TouchableOpacity>
                            <View style={styles.googleContainer}>
                                {/* <GoogleSigninButton
                                    style={{width: 192, height: 48}}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={this._signIn}
                                /> */}
                            </View>
                            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.signUpText}>Create Account</Text>
                            </TouchableOpacity>
                    </ImageBackground>

            </>       
        );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3C413E",
        alignItems: 'center',
        justifyContent: 'center'       
    },

    logoContainer: {
        marginBottom: 20
    },

    image: {
        resizeMode: "contain"
    },

    userInput: {
        width: "70%",
        backgroundColor: "#6F6035",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },

    inputText: {
        height: 50,
        color: "#C9C8B9",
        fontFamily: "Roboto",
    },

    forgotPassword: {
        color: "#C9C8B9",
        fontSize: 11,
        marginTop: 10,
    },

    loginButton: {
        width: "70%",
        backgroundColor: '#C98F39',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 10
    },

    signUpButton: {
        width: "70%",
        borderRadius: 25,
        borderColor: '#C98F39',
        borderWidth: 2,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },

    loginText: {
        color: "#C9C8B9" 
    },

    signUpText: {
        color: '#C98F39'
        
    },

    googleContainer: {
        marginTop: 30,
        marginBottom: 20,
    },

    backgroundImage: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: "#3C413E"   
    },
});