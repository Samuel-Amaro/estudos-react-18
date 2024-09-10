import { createContext } from "react";

//etapa 1: criar o contexto
//O único argumento para createContext é o valor padrão . Aqui, 1 refere-se ao maior nível de título, mas você pode passar qualquer tipo de valor (até mesmo um objeto).
export const LevelContext = createContext(1);
