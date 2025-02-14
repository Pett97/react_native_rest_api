import React, { useEffect, useState } from "react";
import { View, FlatList, Button, Text } from "react-native";
import DATABASE_API from "../src/services/database.API";
import { useTokenContext } from "../src/context/userContext";
import Car from "../src/components/Car";
import { useRouter } from "expo-router";

interface Carro {
  id: string;
  brand: string;
  name: string;
  hp: number;
}

function Userspace() {
  const { token } = useTokenContext();
  const [carros, setCarros] = useState<Carro[]>([]);
  const router = useRouter();

  const deletarCarro = async (id: string) => {
    try {
      await DATABASE_API.delete(`/api/collections/cars/records/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCarros((prevCarros) => prevCarros.filter((carro) => carro.id !== id));
    } catch (error) {
      console.log(`Erro ao deletar carro: ${error}`);
    }
  };

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const resultado = await DATABASE_API.get(
          "/api/collections/cars/records",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCarros(resultado.data.items);
        console.log(resultado.data.items);
      } catch (error) {
        console.log(`Erro ao buscar carros: ${error}`);
      }
    };

    if (token) {
      fetchCarros();
    }
  }, [token]);

  return (
    <View>
      <View>
        <Button
          title="Criar Novo Carro"
          onPress={() => router.push("/telaFormulario")}
        ></Button>
      </View>
      <FlatList
        data={carros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View>
              <Car
                id={item.id}
                brand={item.brand}
                name={item.name}
                hp={item.hp}
              />
            </View>
            <View>
              <View>
                <Button
                  title="Deletar"
                  onPress={() => deletarCarro(item.id)}
                ></Button>
              </View>
              <View>
                <Button
                  title="Editar"
                  onPress={() => router.push(`/editarCarro?id=${item.id}`)}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default Userspace;
