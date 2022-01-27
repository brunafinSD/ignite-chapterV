import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList }: SearchResultsProps) {

// useMemo: evita que alguma coisa que leva muito processamento ex.: cálculos sejam refeitos toda vez que o componente renderizar
// ele memoiza/memoriza o valor da variável que tem o cálculo e só refaz quando a variável do array de dependências mudar
// evita que a mesma variável ocupe um novo lugar na memória quando repassamos do pai para o filho

  const totalPrice = useMemo(() => {
    return results.reduce((total, produto) => {
      return total + produto.price;
    }, 0);
  }, [results]);


  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product => {
        return (
          <ProductItem product={product} key={product.id} onAddToWishList={onAddToWishList}/>
        );
      })}
    </div>
  )
}

// QUANDO USAR O USEMEMO:
/*
  1- Cálculos pesados
  2- Igualdade referencial (quando a gente passa aquela informação para o componente filho)
*/