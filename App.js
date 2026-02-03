import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumberPress = (num) => {
    if (resetDisplay) {
      setDisplay(String(num));
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperationPress = (op) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setResetDisplay(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '×': return prev * current;
      case '÷': return prev / current;
      default: return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const Button = ({ text, onPress, style, textStyle }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          <Button text="C" onPress={handleClear} style={styles.functionButton} />
          <Button text="±" onPress={handleToggleSign} style={styles.functionButton} />
          <Button text="%" onPress={handlePercent} style={styles.functionButton} />
          <Button text="÷" onPress={() => handleOperationPress('÷')} style={styles.operatorButton} />
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <Button text="7" onPress={() => handleNumberPress(7)} />
          <Button text="8" onPress={() => handleNumberPress(8)} />
          <Button text="9" onPress={() => handleNumberPress(9)} />
          <Button text="×" onPress={() => handleOperationPress('×')} style={styles.operatorButton} />
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <Button text="4" onPress={() => handleNumberPress(4)} />
          <Button text="5" onPress={() => handleNumberPress(5)} />
          <Button text="6" onPress={() => handleNumberPress(6)} />
          <Button text="-" onPress={() => handleOperationPress('-')} style={styles.operatorButton} />
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <Button text="1" onPress={() => handleNumberPress(1)} />
          <Button text="2" onPress={() => handleNumberPress(2)} />
          <Button text="3" onPress={() => handleNumberPress(3)} />
          <Button text="+" onPress={() => handleOperationPress('+')} style={styles.operatorButton} />
        </View>

        {/* Row 5 */}
        <View style={styles.row}>
          <Button text="0" onPress={() => handleNumberPress(0)} style={styles.zeroButton} />
          <Button text="." onPress={handleDecimal} />
          <Button text="=" onPress={handleEquals} style={styles.operatorButton} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 70,
    fontWeight: '200',
  },
  buttonContainer: {
    flex: 3,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '400',
  },
  functionButton: {
    backgroundColor: '#a5a5a5',
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  zeroButton: {
    flex: 2,
  },
});