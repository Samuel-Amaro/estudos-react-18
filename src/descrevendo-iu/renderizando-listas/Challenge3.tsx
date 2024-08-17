import { recipes } from "../../data";

type Props = {
  id: string;
  name: string;
  ingredients: string[];
};

function Recipe({ name, ingredients }: Props) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        //Aqui, <Recipe {...recipe} key={recipe.id} /> é um atalho de sintaxe dizendo “passe todas as propriedades do objeto recipe como props para o componente Recipe”.
        //Note que a key é especificada no <Recipe> propriamente dito ao invés de na div raiz retornada por Recipe. Isso se deve ao fato de que essa key é diretamente necessária dentro do contexto do array em que o componente está sendo renderizado. Anteriormente, você tinha um array de <div>s então cada uma delas precisava de uma key, mas agora você tem um array de <Recipe>s. Em outras palavras, quando você extrai um componente, não se esqueça de deixar a key fora da JSX que você copia e cola.
        <Recipe key={recipe.id} {...recipe} />
      ))}
    </div>
  );
}
