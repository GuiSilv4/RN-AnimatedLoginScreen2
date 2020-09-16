import React, { useState, useEffect } from 'react';
import { View, Animated, TouchableWithoutFeedback, Text, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


const CircleButton = (props) => {
  const initialCircleSize = 100 * (width / 5 / 100);
  const text = props.text ? props.text : 'Login';
  const [textOpacity] = useState(new Animated.Value(1));
  const [circleSize] = useState(new Animated.Value(initialCircleSize));
  const [isActive, setActive] = useState(props.active);

  useEffect(() => {
    handleAnimations(1000);
  }, [props.active]);

  const handleAnimations = (duration) => {

    let targetValues = {};
    if (!isActive) {
      targetValues = {
        textOpacity: 0.5,
        circleSize: 0,
      };
      setActive(true);
    } else {
      targetValues = {
        textOpacity: 1,
        circleSize: initialCircleSize,
      };
      setActive(false);
    }

    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: targetValues.textOpacity,
        duration,
        useNativeDriver: true
      }),
      Animated.timing(circleSize, {
        toValue: targetValues.circleSize,
        duration,
        useNativeDriver: false
      }),
    ]).start();
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      if (isActive) { props.onPress() };
    }}  >
      <View style={[styles.container, props.style]}>
        <View>
          <Animated.Text style={{
            borderWidth: 0,
            fontSize: 30,
            color: 'white',
            opacity: textOpacity,
            marginBottom: 10,
          }}>{text}</Animated.Text>
        </View>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: initialCircleSize,
          height: initialCircleSize,
          borderWidth: 0,
        }}>
          <Animated.View style={{
            borderWidth: 0,
            width: circleSize,
            height: circleSize,
            borderRadius: initialCircleSize / 2,
            backgroundColor: 'white',
          }} />
        </View>
      </View>
    </TouchableWithoutFeedback>);

}

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CircleButton;