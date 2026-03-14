import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemonToInsert: Pokemon[] = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({
        name: name.toLocaleLowerCase(),
        no: no,
      } as Pokemon);
    });
    await this.pokemonService.resetPokemons(pokemonToInsert);
    return 'SEED EXECUTED';
  }

  //PROMISE ALL
  async metodoMultiPromesa() {
    await this.pokemonService.deleteAll();

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );
    const inertPromisesArray: any[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      inertPromisesArray.push(
        this.pokemonService.createFake({ name: name, no: no } as Pokemon),
      );
    });

    await Promise.all(inertPromisesArray);

    return 'SEED EXECUTED CON PROMISE ALL';
  }
}
