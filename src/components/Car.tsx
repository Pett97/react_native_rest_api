import React from "react";
import { Text, View } from "react-native";
import styleCar from "./carStyle";

interface CarProps {
  id?: string;
  brand: string;
  name: string;
  hp: number;
}

function Car({ id, brand, name, hp }: CarProps) {
  return (
    <View style={styleCar.container}>
      <Text style={styleCar.text}>Brand: {brand}</Text>
      <Text style={styleCar.text}>Name: {name}</Text>
      <Text style={styleCar.text}>HP: {hp}</Text>
    </View>
  );
}

export default Car;
