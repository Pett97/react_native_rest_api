import React, { useEffect, useState } from "react";
import { View, FlatList, Button, TextInput } from "react-native";
import DATABASE_API from "../../src/services/database.API";
import { useTokenContext } from "../../src/context/userContext";
import Car from "../../src/components/Car";
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
  const [carrosFiltrados, setCarrosFiltrados] = useState<Carro[]>([]);
  const [nomeMarca, setNomeMarca] = useState("");
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
        setCarrosFiltrados(resultado.data.items); // Inicializa com todos os carros
      } catch (error) {
        console.log(`Erro ao buscar carros: ${error}`);
      }
    };

    if (token) {
      fetchCarros();
    }
  }, [token]);

  useEffect(() => {
    const resultadosFiltrados = carros.filter((carro) =>
      carro.brand.toLowerCase().includes(nomeMarca.toLowerCase())
    );
    setCarrosFiltrados(resultadosFiltrados);
  }, [nomeMarca, carros]);

  return (
    <View>
      <View>
        <TextInput
          placeholder="Buscar Por Marca"
          value={nomeMarca}
          onChangeText={(text) => setNomeMarca(text)} // Corrigido aqui
        />
      </View>
      <View>
        <Button
          title="Criar Novo Carro"
          onPress={() => router.push("/telaFormulario")}
        />
      </View>
      <FlatList
        data={carrosFiltrados} // Renderiza a lista filtrada
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View>
              <Car brand={item.brand} name={item.name} hp={item.hp} />
            </View>
            <View>
              <Button title="Deletar" onPress={() => deletarCarro(item.id)} />
              <Button
                title="Editar"
                onPress={() => router.push(`/editarCarro?id=${item.id}`)}
              />
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </View>
  );
}

export default Userspace;
