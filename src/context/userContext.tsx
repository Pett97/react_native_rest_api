import { PropsWithChildren, createContext, useContext, useState } from "react";

interface TokenContextProps {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export default function TokenContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | undefined>(undefined);

  const value: TokenContextProps = {
    token,
    setToken,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}

export function useTokenContext() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokenContext deve ser usado dentro de um TokenContextProvider");
  }
  return context;
}
