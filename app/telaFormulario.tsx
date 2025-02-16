import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useTokenContext } from "../src/context/userContext";
import DATABASE_API from "../src/services/database.API";
import {useRouter } from "expo-router";

function TelaFormulario() {
  const { token } = useTokenContext();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const router = useRouter();

  const postCarro = async () => {
    try {
      if (!brand || !name || !hp) {
        alert("tem que todos todos os campos ");
        return;
      }

      const hpNumber = parseInt(hp);
      if (isNaN(hpNumber)) {
        alert("erro no HP");
        return;
      }

      const resultado = await DATABASE_API.post(
        "/api/collections/cars/records",
        {
          brand,
          name,
          hp: hpNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/userspace/userspace");
    } catch (error) {
      //console.log(`ERROR: ${error}`);
    }
  };

  return (
    <View>
      <Text>Cadastrar Novo Carro</Text>
      <View>
        <TextInput
          value={brand}
          onChangeText={setBrand}
          placeholder="Marca do Carro"
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nome do Carro"
        />
        <TextInput
          value={hp}
          onChangeText={setHp}
          keyboardType="numeric"
          placeholder="Potência em HPS"
        />
        <Button title="Cadastrar Carro" onPress={postCarro} />
      </View>
    </View>
  );
}

export default TelaFormulario;
