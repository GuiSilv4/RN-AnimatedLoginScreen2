import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';


export default function Button(props) {

  const color2 = '#003050'
  const color1 = '#003050';
  const color3 = '#003050';

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDisabled(props.disabled);
  }, [props.disabled]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}
      disabled={disabled} delayPressIn={0}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={[
          disabled ? '#BBB' : color1,
          disabled ? '#AAA' : color2,
          disabled ? '#999' : color3]}
        style={[styles.button, (props.height && { height: props.height })]}>
        {loading ?
          <ActivityIndicator color="#FFF" size="large" /> :
          (
            <Text style={styles.buttonText}>
              {props.title ? props.title.toUpperCase() : "BOTÃO"}
            </Text>
          )}

      </LinearGradient>
    </TouchableOpacity>
  )
}

let marginDevice = 0;

if (Dimensions.get('window').height <= 760) {
  marginDevice = 40;
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  button: {
    width: '75%',
    height: 60,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#FFF",
  },
})