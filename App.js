/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
	TextInput,
	TouchableOpacity,
} from 'react-native';


const App = () => {
	const [inputs, setInputs] = useState(
		[
			{
				value: '0',
				key: 'form-1',
				isChecked: false,
			},
			{
				value: '0',
				key: 'form-2',
				isChecked: false,
			},
			{
				value: '0',
				key: 'form-3',
				isChecked: false,
			},
		]
	)
	const [operators, setOperators] = useState(
		[
			'+',
			'-',
			'x',
			'/'
		]
	)
	const [output, setOutput] = useState(0)

	const submit = (operator) => () => {
		const valueToProcess = []
		inputs.forEach(input => {
			if (input.isChecked) {
				valueToProcess.push(+input.value)
			}
		});

		let result = valueToProcess[0]
		for (let i=0; i<valueToProcess.length-1; i++) {
			if (operator === '+') {
				result += valueToProcess[i+1]
			} else if (operator === '-') {
				result -= valueToProcess[i + 1]
			} else if (operator === 'x') {
				result *= valueToProcess[i + 1]
			} else if (operator === '/') {
				result /= valueToProcess[i + 1]
			}
		}

		setOutput(result)
	}

	const onChange = (val, index) => {

		let arr = [...inputs];
		arr[index] = { ...arr[index], value: val }

		setInputs(arr)
	}

	const checked = (index) => () => {
		let arr = [...inputs];
		arr[index] = { ...arr[index], isChecked: !arr[index].isChecked };

		setInputs(arr)
	}

  return (
    <View style={styles.container}>
				{ inputs?.map((input, i) => (
					<View key={ i } style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder={`Input ${i+1}`}
							placeholderTextColor={'#000000'}
							keyboardType={'numeric'}
							value={input.value}
							onChangeText={ val => onChange(val, i) }
						/>
						<TouchableOpacity onPress={ checked(i) } style={ input.isChecked ? styles.buttonActive : styles.button }>
							<Text style={ styles.buttonText }>v</Text>
						</TouchableOpacity>
					</View>
				))}
				<View style={styles.buttons}>
				{ operators.map(operator => (
					<TouchableOpacity key={operator} onPress={ submit(operator) } style={styles.button}>
						<Text style={styles.buttonText}>{operator}</Text>
					</TouchableOpacity>
				)) }
				</View>

				<View style={{ marginTop: 20 }}>

					<Text style={{ color: 'black' }}>Hasil</Text>
					<Text style={{ color: 'black' }}>{ output }</Text>
				</View>
		</View>
  );
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#FFFF'
	},
	inputContainer: {
		height: 70,
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical:10,
	},
	input: {
		width: 200,
		height: 50,
		color: 'black',
		borderWidth:1,
		borderStyle: 'solid',
		borderColor: 'black',
	},
	buttons: {
		flexDirection: 'row',
		width: '100%',
		padding: 10,
	},
	button:{
		alignItems: 'center',
		justifyContent: 'center',
		width:80,
		marginHorizontal:10,
		height:50,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderTopWidth: 1,
	},
	buttonText: {
    fontSize:20,
    textAlign: 'center',
		color: 'black',
	},
	buttonActive: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 80,
		marginHorizontal: 10,
		height: 50,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderTopWidth: 1,
		backgroundColor: 'green',
	}
});

export default App;
