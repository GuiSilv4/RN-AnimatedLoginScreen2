import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CircleButton from '../../components/CircleButton';
import {
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');

const Login = () => {

  const titleText = 'BEAUX';
  const subtitleText = 'VOYAGES';

  const initialLoginContainerHeight = height / 3.5;
  const [loginContainerHeight] = useState(new Animated.Value(initialLoginContainerHeight));
  const [confirmPasswordHeight] = useState(new Animated.Value(0));
  const [confirmPasswordOpacity] = useState(new Animated.Value(0));

  const [isActive, setActive] = useState(true);
  const [iconMarginBottom, setIconMarginBottom] = useState(Platform.OS === 'ios' ? 5 : 0);

  useEffect(() => {

    if (!isActive) {
      setTimeout(() => {
        setIconMarginBottom(Platform.OS === 'ios' ? 5 : 0)
      }, 1000);

      Animated.parallel([
        Animated.timing(loginContainerHeight, {
          toValue: Platform.OS === 'ios' ? height / 2.8 : height / 2.5,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(confirmPasswordHeight, {
          toValue: 70,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(confirmPasswordOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        })
      ]).start();
    } else {
      setTimeout(() => {
        setIconMarginBottom(Platform.OS === 'ios' ? 6 : 1)
      }, 1000);
      Animated.parallel([
        Animated.timing(loginContainerHeight, {
          toValue: initialLoginContainerHeight,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(confirmPasswordHeight, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(confirmPasswordOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        })
      ]).start();
    }
  }, [isActive])

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='rgba(43,54,115,1)' />
      <View style={{ ...StyleSheet.absoluteFill, }}>
        <Image source={require('../../assets/4.jpg')}
          style={{
            flex: 1,
            height: null,
            width: null
          }} />
      </View>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{titleText}</Text>
          <Text style={[styles.title, { marginLeft: 15 }]}>
            {subtitleText}
          </Text>
        </View>

        <View style={{ marginBottom: 67, marginTop: 50, width: '100%' }}>
          <CircleButton text='Login' active={isActive} style={{
            alignSelf: 'flex-start',
            marginLeft: width / 6
          }}
            onPress={() => { setActive(!isActive) }} />
          <CircleButton text='Sign Up' active={!isActive}
            style={{
              alignSelf: 'flex-end',
              right: width / 6,
            }} onPress={() => { setActive(!isActive) }} />
        </View>

        <Animated.View style={[styles.loginContainer, { height: loginContainerHeight }]}>
          <View style={styles.inputsContainer}>
            <Input iconName='mail' placeholder='Email' style={{ marginTop: 0 }}></Input>
            <Input iconName='lock' placeholder='Password' secure></Input>
            <Animated.View style={{
              justifyContent: 'flex-start',
              height: confirmPasswordHeight,
              opacity: confirmPasswordOpacity,
            }}>
              <Input iconName='lock' placeholder='Confirm Password'
                styleIcon={{ marginBottom: iconMarginBottom }}
                secure />
            </Animated.View>

            <Button
              title="Login"
              style={{ marginTop: Platform.OS === 'ios' ? (height / 3) * 0.12 : (height / 3) * 0.08 }}
              height={(height / 3) * 0.18} />
          </View>
        </Animated.View>

        <View style={styles.helpContainer}>
          <Text style={styles.needHelp}>
            Need Help ?
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  loginContainer: {
    marginTop: 0,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
  },

  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },

  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: '500',
    marginTop: -10,
  },

  needHelp: {
    fontSize: 20,
    color: 'white'
  },
  helpContainer: {
    marginTop: 20
  },

});

export default Login;