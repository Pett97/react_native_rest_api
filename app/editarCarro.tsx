import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useLocalSearchParams,} from 'expo-router';
import DATABASE_API from "../src/services/database.API";
import { useTokenContext } from "../src/context/userContext";
import { useRouter } from "expo-router";

interface Carro {
  id: string;
  brand: string;
  name: string;
  hp: number;
}

function EditarCarro() {
  const { id } = useLocalSearchParams();
  const { token } = useTokenContext();
  const [carro, setCarro] = useState<Carro | null>(null);
  const router = useRouter();

  // Dados novos
  const [novoNome, setNovoNome] = useState("");
  const [novaMarca, setNovaMarca] = useState("");
  const [novoHp, setNovoHp] = useState("");

  const atualizarCarro = async () => {
    try {
      const resultado = await DATABASE_API.patch(
        `/api/collections/cars/records/${id}`,
        {
          name: novoNome || carro?.name,
          brand: novaMarca || carro?.brand,
          hp: novoHp ? parseInt(novoHp) : carro?.hp,
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
      //console.log(`Erro ao atualizar carro: ${error}`);
    }
  };

  useEffect(() => {
    const buscarCarro = async () => {
      try {
        const resultado = await DATABASE_API.get(
          `/api/collections/cars/records/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCarro(resultado.data);
        setNovoNome(resultado.data.name);
        setNovaMarca(resultado.data.brand);
        setNovoHp(String(resultado.data.hp));
      } catch (error) {
        //console.log(`Erro ao buscar carro: ${error}`);
      }
    };

    if (id) {
      buscarCarro();
    }
  }, [id, token]);

  if (!carro) {
    return <Text>Carro não encontrado</Text>;
  }

  return (
    <View>
      <View>
        <TextInput
          value={novaMarca}
          onChangeText={setNovaMarca}
         placeholder="tste"
        />
        <TextInput
          value={novoNome}
          onChangeText={setNovoNome}
           placeholder="tste"
        />
        <TextInput
          value={novoHp}
          onChangeText={setNovoHp}
          keyboardType="numeric"
           placeholder="tste"
        />
      </View>
      <View>
        <Button title="Voltar" onPress={() => {router.push("/userspace/userspace")}} />
        <Button title="Atualizar" onPress={atualizarCarro} />
      </View>
    </View>
  );
}

export default EditarCarro;
