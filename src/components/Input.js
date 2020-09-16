import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

Icon.loadFont();

const colorTheme = '#999';

export default function Input(props) {

  const [showPassword, setShowPassword] = useState(false);

  const initialSizeState = {
    fontSize: 16,
    iconSize: 25,
    eyeIconSize: 20,
  }
  const [size, setSize] = useState(initialSizeState)

  const loadSize = () => {
    if (props.size === 'big') {
      setSize({
        fontSize: 18,
        iconSize: 30,
        eyeIconSize: 22,
      })
    } else { setSize(initialSizeState) }
  }

  useEffect(() => {
    loadSize();
  }, [props.size]);

  const eyeIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => { setShowPassword(!showPassword) }}>
        <Icon
          name={showPassword ? 'eye' : 'eye-off'}
          size={size.eyeIconSize}
          color={colorTheme}
          style={[styles.icon, props.styleIcon]}
        />
      </TouchableWithoutFeedback>
    )
  }
  return (

    <View style={[styles.container, props.style]}>
      <Icon
        name={props.iconName}
        size={size.iconSize}
        color={colorTheme}
        style={[styles.icon, props.styleIcon]}
      />
      <TextInput
        style={[styles.textInput, { fontSize: size.fontSize, }, props.styleInput]}
        placeholder={props.placeholder}
        autoCapitalize='none'
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secure ? !showPassword : false}
        selectTextOnFocus={false}

      />
      {props.secure && eyeIcon()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    marginTop: Platform.OS === 'ios' ? 30 : 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colorTheme,
    width: "80%",
    alignSelf: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
    marginLeft: 10,
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
    color: colorTheme,
    marginBottom: Platform.OS === 'ios' ? 4 : 0,
  }

});