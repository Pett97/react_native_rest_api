import { Redirect } from "expo-router";
import { Button, Text } from "react-native";
import { useTokenContext } from "../src/context/userContext";
import DATABASE_API from "../src/services/database.API";


export default function index() {
  const { token, setToken } = useTokenContext();

  if (token) return <Redirect href="/userspace/userspace" />;

  return (
    <>
      <Text>
        verificar se tem o usuario criado no PocketBase
      </Text>

      <Button
        title="login"
        onPress={async () => {
          try {
            const result = await DATABASE_API.post(
              "/api/collections/users/auth-with-password",
              {
                identity: "teste2@gmail.com",
                password: "peterson1234567890",
              }
            );

            setToken(result.data.token);
          } catch (error) {
            //console.log(`ERRO NO INDEX ERRO=> ${error}`)
          }
        }}
      />
    </>
  );
}