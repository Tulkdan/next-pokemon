import { useEffect, useMemo, useState } from 'react';
import { TRegionsResponse } from '../../pages/api/pokemons/regions';
import { TCitiesResponse } from '../../pages/api/pokemons/cities';
import { TPokemonsResponse } from '../../pages/api/pokemons/pokemons';
import { TDateResponse } from '../../pages/api/scheduling/date';
import { TTimeResponse } from '../../pages/api/scheduling/time';
import { useRouter } from 'next/router';

type TPayload = {
  name: string;
  secondName: string;
  region: string;
  city: string;
  pokemons: string[];
  date: string;
  time: string;
  pokemonsAmount: number;
  subTotal: number;
  tax: number;
  total: number;
}

export default function ScheduleHook() {
  const router = useRouter();

  const nameState = useState("");
  const secondNameState = useState("");

  const [regions, setRegions] = useState<TRegionsResponse["results"]>([]);
  const [cities, setCities] = useState<TCitiesResponse["results"]>([]);
  const [pokemons, setPokemons] = useState<TPokemonsResponse["results"]>([]);

  const regionState = useState("");
  const cityState = useState("");

  const [pokemonsList, setPokemonsList] = useState<Array<string>>([""]);

  const [schedulingDate, setSchedulingDate] = useState<TDateResponse>([]);
  const [schedulingTime, setSchedulingTime] = useState<TTimeResponse>([]);

  const scheduleDateState = useState("");
  const scheduleTimeState = useState("");

  const addPokemonToList = () => {
    if (pokemonsList.length < 6) {
      const newList = [...pokemonsList];
      newList.push("");
      setPokemonsList([...newList]);
    }
  }

  const handlePokemonSelectInList = (value: string, index: number) => {
    const newList = [...pokemonsList];
    newList[index] = value;
    setPokemonsList([...newList]);
  }

  const submit = () => {
    const payload: TPayload = {
      name: nameState[0],
      secondName: secondNameState[0],
      region: regionState[0],
      city: cityState[0],
      pokemons: pokemonsList,
      date: scheduleDateState[0],
      time: scheduleTimeState[0],
      pokemonsAmount: pokemonsList.filter((v) => v).length,
      subTotal: pokemonsList.filter((v) => v).length * 70,
      tax: 2.1,
      total: pokemonsList.filter((v) => v).length * 70 + 2.1,
    };

    const randomNumber = Math.round(Math.random() * 10);

    if (randomNumber % 2 === 0) {
      router.push("/submit/success");
      return
    }

    router.push("/submit/error");
  }

  useEffect(() => {
    if (!regions.length)
      fetch("/api/pokemons/regions")
        .then((d) => d.json())
        .then((data) => setRegions(data.results))
        .catch(() =>
          console.error(
            "Ocorreu um erro enquanto solicitava em /api/pokemons/regions"
          )
        );
  }, [regions]);

  useEffect(() => {
    if (!cities.length)
      fetch("/api/pokemons/cities")
        .then((d) => d.json())
        .then((data) => setCities(data.results))
        .catch(() =>
          console.error(
            "Ocorreu um erro enquanto solicitava em /api/pokemons/cities"
          )
        );
  }, [cities]);

  useEffect(() => {
    if (!pokemons.length)
      fetch("/api/pokemons/pokemons")
        .then((d) => d.json())
        .then((data) => setPokemons(data.results))
        .catch(() =>
          console.error(
            "Ocorreu um erro enquanto solicitava em /api/pokemons/pokemons"
          )
        );
  }, [pokemons]);

  useEffect(() => {
    if (!schedulingDate.length)
      fetch("/api/scheduling/date")
        .then((resp) => resp.json())
        .then((data) => setSchedulingDate(data))
        .catch(() =>
          console.error(
            "Ocorreu um erro enquanto solicitava em /api/scheduling/date"
          )
        );
  }, [schedulingDate]);

  useEffect(() => {
    if (!schedulingTime.length)
      fetch("/api/scheduling/time", {
        method: 'POST',
        headers: { 'content-type': 'application/json' }
      })
        .then((resp) => resp.json())
        .then((data) => setSchedulingTime(data))
        .catch(() =>
          console.error(
            "Ocorreu um erro enquanto solicitava em /api/scheduling/time"
          )
        );
  }, [schedulingTime]);

  const tax= 2.1
  const subTotal= useMemo(() => pokemonsList.filter((v) => v).length * 70, [pokemonsList])
  const total= useMemo(() => pokemonsList.filter((v) => v).length * 70 + tax, [pokemonsList, tax])
  const pokemonsAmount = useMemo(() => pokemonsList.filter((v) => v).length, [pokemonsList])

  return {
    nameState,
    secondNameState,
    cityState,
    regionState,
    pokemonsList,
    regions,
    cities,
    pokemons,
    schedulingDate,
    schedulingTime,
    scheduleDateState,
    scheduleTimeState,
    tax,
    subTotal,
    total,
    pokemonsAmount,
    handlePokemonSelectInList,
    addPokemonToList,
    submit
  }
}