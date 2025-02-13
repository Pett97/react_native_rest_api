import React, { useEffect, useState } from "react";
import { View, FlatList, Button } from "react-native";
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
  const router  = useRouter();

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
        <Button title="Criar Novo Carro" onPress={()=>router.push("/telaFormulario")}></Button>
      </View>
      <FlatList
        data={carros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Car
            id={item.id}
            brand={item.brand}
            name={item.name}
            hp={item.hp}
          />
        )}
      />
    </View>
  );
}

export default Userspace;
