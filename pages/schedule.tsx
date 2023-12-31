
import Head from 'next/head'
import PageInfo from '../src/components/PageInfo'
import InputBase from '../src/components/Inputs/Base'
import InputSelect from '../src/components/Inputs/Select'
import Button from '../src/components/Button';

import ScheduleHook from '../src/hooks/schedule';
import { formatToCurrency } from '../src/utils/formatToCurrency';

export default function AboutPage() {
  const {
    cityState: [citySelected, setCitySelected],
    nameState: [name, setName],
    pokemonsAmount,
    pokemonsList,
    regionState: [regionSelected, setRegionSelected],
    scheduleDateState: [scheduleDate, setScheduleDate],
    scheduleTimeState: [scheduleTime, setScheduleTime],
    schedulingDate,
    schedulingTime,
    secondNameState: [secondName, setSecondName],
    subTotal,
    cities,
    pokemons,
    regions,
    tax,
    total,
    handlePokemonSelectInList,
    addPokemonToList,
    submit
  } = ScheduleHook()

  return (
    <>
      <Head>
        <title>Agendar Consulta</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col justify-center'>
        <PageInfo
          pagePath={["Home", "Agendar Consulta"]}
          pageTitle="Agendar Consulta"
          pageSubtitle="Recupere seus pokémons em 5 segundos"
        />

        <div className="flex justify-center mt-6 mb-12">
          <div className="max-w-3xl flex flex-col">
            <h1 className="text-xl font-bold">
              Preencha o formulario abaixo para agendar sua consulta
            </h1>

            <div className="flex gap-x-6 mt-4">
              <InputBase
                placeholder="Digite seu nome"
                label="Nome"
                value={name}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setName(ev.target.value)
                }
              />

              <InputBase
                placeholder="Digite seu sobrenome"
                label="Sobrenome"
                value={secondName}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setSecondName(ev.target.value)
                }
              />
            </div>

            <div className="flex gap-x-6 mt-4">
              <InputSelect
                label="Região"
                placeholder="Selecione sua região"
                value={regionSelected}
                onChange={setRegionSelected}
                options={regions.map((v) => ({ label: v.name, value: v.name }))}
              />

              <InputSelect
                label="Cidade"
                placeholder="Selecione sua cidade"
                value={citySelected}
                onChange={setCitySelected}
                options={cities.map((v) => ({ label: v.name, value: v.name }))}
              />
            </div>

            <div className="mt-8">
              <div className="text-sm font-bold whitespace-nowrap">
                Cadastre seu time
              </div>

              <div className="text-sm font-light whitespace-nowrap mt-3">
                Atendemos até 06 pokémons por vez
              </div>
            </div>

            <div className="flex flex-col mt-4">
              {pokemonsList.map((pokemon, i) => {
                return (
                  <div className="flex items-center justify-between mb-8" key={i + "pl"}>
                    <span className="text-sm font-bold whitespace-nowrap mr-4">
                      Pokémon {String(i + 1).padStart(2, "0")}
                    </span>
                    <InputSelect
                      value={pokemon}
                      placeholder="Selecione um pokémon"
                      onChange={(v) => handlePokemonSelectInList(v, i)}
                      options={pokemons.map((v) => ({
                        label: v.name,
                        value: v.name,
                      }))}
                    />
                  </div>
                );
              })}
              <Button onClick={addPokemonToList} alt="secondary">
                Adicionar novo pokémon ao time...
              </Button>
            </div>

            <div className="flex gap-x-6 mt-12">
              <InputSelect
                placeholder="Selecione uma data"
                label="Data para atendimento"
                options={schedulingDate.map((v) => ({ label: v, value: v }))}
                value={scheduleDate}
                onChange={setScheduleDate}
              />
              <InputSelect
                placeholder="Selecione um horário"
                label="Horário para atendimento"
                options={schedulingTime.map((v) => ({ label: v, value: v }))}
                value={scheduleTime}
                onChange={setScheduleTime}
              />
            </div>

            <hr className="border boder-solid border-gray-200 mt-8" />

            <div className="mt-8 w-full">
              <div className="flex item-center justify-between">
                <span className="mb-4">
                  Número de pokémons a serem atendidos:
                </span>
                <span className="mb-4">
                  {String(pokemonsAmount).padStart(2, "0")}
                </span>
              </div>

              <div className="flex item-center justify-between">
                <span className="mb-4">
                  Atendimento unitário por pokémon:
                </span>
                <span className="mb-4">{formatToCurrency(70)}</span>
              </div>

              <div className="flex item-center justify-between">
                <span className="mb-4">Subtotal:</span>
                <span className="mb-4">
                  {formatToCurrency(subTotal)}
                </span>
              </div>

              <div className="flex item-center justify-between">
                <span className="mb-4">Taxa geracional*:</span>
                <span className="mb-4">
                  {formatToCurrency(tax)}
                </span>
              </div>

              <div className="flex item-center justify-between">
                <span className="mb-4" style={{ fontSize: 8 }}>
                  *adicionamos uma taxa de 3%, multiplicado pelo número da geração
                  mais alta do time, com limite de até 30%
                </span>
              </div>
            </div>

            <div className="mt-2 w-full">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">
                  Valor Total: {formatToCurrency(total)}
                </span>

                <Button onClick={submit}>
                  Concluir Agendamento
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
