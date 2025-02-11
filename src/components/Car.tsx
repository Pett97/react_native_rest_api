import React from "react";
import { Text, View } from "react-native";

interface CarProps {
  id?: string;
  brand: string;
  name: string;
  hp: number;
}

function Car({ id, brand, name, hp }: CarProps) {
  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>BRAND: {brand}</Text>
      <Text>NAME: {name}</Text>
      <Text>HP: {hp}</Text>
    </View>
  );
}

export default Car;
