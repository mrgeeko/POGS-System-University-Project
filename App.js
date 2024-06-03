import React, {useState} from "react";
import {SafeAreaView, StyleSheet, View, Text, Button, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker'; 

export default function App() {
  //creating the value stores for the drop downs & order total message and setting initial values
  const [picker1SelectedValue, setPicker1SelectedValue] = useState("val-Selection");
  const [picker2SelectedValue, setPicker2SelectedValue] = useState("val-Selection");
  const [picker3SelectedValue, setPicker3SelectedValue] = useState("val-Selection");
  const [picker4SelectedValue, setPicker4SelectedValue] = useState("val-Selection");
  const[calculateValue, setCalculatedValue] = useState("Total Cost: 0");
  
  return (
<SafeAreaView style={styles.container}>
<View style = {styles.layer1}>
<Text style = {styles.heading1}>
Produce Owner Group (POG) 
</Text>
</View>

<View style = {styles.layer4}>
<Image source={{uri:'https://media.istockphoto.com/id/1127258398/vector/summer-field-landscape-nature-hills-fields-blue-sky-clouds-sun-countryside-cartoon-green.jpg?b=1&s=170667a&w=0&k=20&c=Pdk6dLhzJa7QryPzWHihlFBE0z_EZGRGYD4h4-ZbZsg='}}
style={{width: 544, height: 317}}
/>
</View>

<View style = {styles.layer2}> 
<View style={styles.pickerRow}>
<View style={styles.pickerContainer}>
<Text style={styles.pickerLabel}>Select a vegetable:</Text>
<Picker style = {styles.picker}
  //creating the vegetable selection dropdown
  selectedValue = {picker1SelectedValue}
  onValueChange = {(itemValue, itemIndex) =>
  setPicker1SelectedValue (itemValue)
  }
  >
  <Picker.Item label = "Select Vegetable" value = "val-Selection"/>
  <Picker.Item label = "Carrot - $2" value = "val-Carrot-2"/>
  <Picker.Item label = "Pumpkin - $2" value = "val-Pumpkin-2"/>
  <Picker.Item label = "Capsicum - $8" value = "val-Capsicum-8"/>
  <Picker.Item label = "Zucchini - $7" value = "val-Zucchini-7"/>
  <Picker.Item label = "Cucumber - $9" value = "val-Cucumber-9"/>
</Picker>
</View>

<View style={styles.pickerContainer}>
<Text style={styles.pickerLabel}>Select quantity:</Text>
<Picker style = {styles.picker}
  //creating the vegetable quantity dropdown
  selectedValue = {picker2SelectedValue}
  onValueChange = {(itemValue, itemIndex) =>
  setPicker2SelectedValue (itemValue)
  }
  >
  <Picker.Item label = "Quantity" value = "val-Selection"/>
  <Picker.Item label = "1" value = "1"/>
  <Picker.Item label = "2" value = "2"/>
  <Picker.Item label = "3" value = "3"/>
  <Picker.Item label = "4" value = "4"/>
  <Picker.Item label = "5" value = "5"/>
</Picker>
</View>
</View>

<View style={styles.pickerRow}>
<View style={styles.pickerContainer}>
<Text style={styles.pickerLabel}>Select a fruit:</Text>
<Picker style = {styles.picker}
  //creating the fruit selection dropdown
  selectedValue = {picker3SelectedValue}
  onValueChange = {(itemValue, itemIndex) =>
  setPicker3SelectedValue (itemValue)
  }
  >
  <Picker.Item label = "Select Fruit" value = "val-Selection"/>
  <Picker.Item label = "Strawberry - $99" value = "val-Strawberry-99"/>
  <Picker.Item label = "Banana - $45" value = "val-Banana-45"/>
  <Picker.Item label = "Rockmelon - $75" value = "val-Rockmelon-75"/>
  <Picker.Item label = "Apple - $11" value = "val-Apple-11"/>
  <Picker.Item label = "Tomato - $75" value = "val-Tomato-75"/>
</Picker>
</View>

<View style={styles.pickerContainer}>
<Text style={styles.pickerLabel}>Select quantity:</Text>
<Picker style = {styles.picker}
  //creating the fruit quantity dropdown
  selectedValue = {picker4SelectedValue}
  onValueChange = {(itemValue, itemIndex) =>
  setPicker4SelectedValue (itemValue)
  }
  >
  <Picker.Item label = "Quantity" value = "val-Selection"/>
  <Picker.Item label = "1" value = "1"/>
  <Picker.Item label = "2" value = "2"/>
  <Picker.Item label = "3" value = "3"/>
  <Picker.Item label = "4" value = "4"/>
  <Picker.Item label = "5" value = "5"/>
</Picker>
</View>
</View>
</View>

<View style = {styles.buttonContainer}>
  <Button
  title = "Calculate Price"
  color="#4caf50"
  onPress = {()=>{
    //obtaining the price/quantity values from the drop downs as integers
    const vegetablePrice = parseInt(picker1SelectedValue[picker1SelectedValue.length-1]);
    const vegetableQuantity = parseInt(picker2SelectedValue);
    const fruitPrice = parseInt(picker3SelectedValue.substring(picker3SelectedValue.length-2));
    const fruitQuantity = parseInt(picker4SelectedValue);

    let displayMessage = "default"; //order total message or error message
    
    //checking for if only vegetable name OR quantitiy is selected
    if(Number.isInteger(vegetablePrice) && !Number.isInteger(vegetableQuantity)){
      const vegetableName = picker1SelectedValue.substring(4, picker1SelectedValue.length-2);
      displayMessage = "Please select a quantity for " + vegetableName;
    }
    else if(!Number.isInteger(vegetablePrice) && Number.isInteger(vegetableQuantity)){
      displayMessage = "Please select a vegetable or remove the quantity";
    }
    //checking for only fruit name OR quantity is selected
    else if(Number.isInteger(fruitPrice) && !Number.isInteger(fruitQuantity)){
      const fruitName = picker3SelectedValue.substring(4, picker3SelectedValue.length-3);
      displayMessage = "Please select a quantity for " + fruitName;
    }
    else if(!Number.isInteger(fruitPrice) && Number.isInteger(fruitQuantity)){
      displayMessage = "Please select a fruit or remove the quantity";
    }
    //checking if at least one of fruit and vegetable is selected
    else if(!Number.isInteger(fruitPrice) && !Number.isInteger(vegetablePrice)){
      displayMessage = "Please select a fruit or vegetable"
    }
    //checking if both a fruit and vegetable is selected and calculaitng the total
    else if(Number.isInteger(fruitPrice) && Number.isInteger(vegetablePrice)){
      const cost = vegetablePrice * vegetableQuantity + fruitPrice * fruitQuantity;
      displayMessage = "Total Cost: $" + cost;
    }
    //getting here means only a fruit + quantity OR vegetable + quantity is selected, check if it's a vegetable
    else if(Number.isInteger(vegetablePrice)){
      const cost = vegetablePrice * vegetableQuantity;
      displayMessage = "Total Cost: $" + cost;
    }
    //getting here means only a fruit + quantity has been selected
    else{
      const cost = fruitPrice * fruitQuantity;
      displayMessage = "Total Cost: $" + cost;
    }

    //display the order total/error message on the screen
    setCalculatedValue(displayMessage);
  }
  }
  />
  <Text style={styles.result}> {calculateValue}</Text>
  </View>

  <View style = {styles.layer3}>
  <Text style = {styles.footer1}>
  App developed by Apsara, Bailey, Francine, Rafi and Riley
  </Text>
  </View>

</SafeAreaView>
  );}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  layer1: {
    padding: 20,
    backgroundColor: '#4caf50',
  },
  heading1: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  footer1: {
    marginTop: 30,
    textAlign: 'center',
    verticalAlign: 'bottom',
      },
  layer2: {
    padding: 20,
  },
  layer3: { 
    //Insert
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
    marginRight: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 0,
    alignItems: 'center',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
