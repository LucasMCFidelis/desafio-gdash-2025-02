import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { parseAsInteger, useQueryStates } from "nuqs";

import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_app/pokemons/")({
  component: RouteComponent,
});

export interface PokemonResponse<T extends PokemonItemBase = PokemonItemBase> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export interface PokemonItemBase {
  name: string;
  url: string;
}
export interface PokemonItem extends PokemonItemBase {
  id: number;
  imageUrl: string;
}

function RouteComponent() {
  const DEFAULT_ITEMS_PER_PAGE = 10
  const [{ page, itensPerPage }, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    itensPerPage: parseAsInteger.withDefault(DEFAULT_ITEMS_PER_PAGE),
  });

  const offset = (page - 1) * itensPerPage;

  const { data: pokemonData, isLoading } = useQuery<
    PokemonResponse<PokemonItem>
  >({
    queryKey: ["pokemons", page, itensPerPage],
    queryFn: async () => {
      const response = await axios.get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${itensPerPage}&offset=${offset}`
      );
      return {
        ...response.data,
        results: response.data.results.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          return {
            ...pokemon,
            id: Number(id),
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        }),
      };
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Carregando...</div>;

  const totalPages = Math.ceil(pokemonData!.count / itensPerPage);

  function firstPage() {
    setSearchParams({ page: 1 });
  }

  function lastPage() {
    setSearchParams({ page: totalPages });
  }

  function previousPage() {
    const previous = page - 1;
    if (previous <= 0) return;
    setSearchParams({ page: previous });
  }
  function nextPage() {
    const next = page + 1;
    if (next > totalPages) return;
    setSearchParams({ page: next });
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="grid w-full gap-4 grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-5 lg:gap-10">
        {pokemonData?.results.map((pokemon) => (
          <div
            key={pokemon.name}
            className="flex flex-col gap-3 justify-center items-center font-bold text-primary lg:size-52 overflow-hidden"
          >
            <img src={pokemon.imageUrl} alt={pokemon.name} className="flex-1" />
            <p className="text-center line-clamp-1 h-6">{pokemon.name}</p>
          </div>
        ))}
      </div>

      <Pagination className="col-span-full flex flex-col gap-4 md:flex-row justify-between">
        <div className="flex gap-2 items-center">
          <Label>Itens por página</Label>
          <Select
            defaultValue={`${DEFAULT_ITEMS_PER_PAGE}`}
            onValueChange={(value) =>
              setSearchParams({ itensPerPage: Number(value) })
            }
          >
            <SelectTrigger className="w-fit">
              <SelectValue aria-label="Itens por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink onClick={firstPage}>
              <ChevronFirst />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious onClick={previousPage} />
          </PaginationItem>

          <PaginationItem>
            Página {page} de {totalPages}
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={nextPage} />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={lastPage}>
              <ChevronLast />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
