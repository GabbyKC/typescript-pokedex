// this means if container is not of type HTMLElement, TypeScript will check again if the value is equal to the type
// after the pipe (|) symbol and so forth because you can have multiple types.
const container: HTMLElement | any = document.getElementById("app");
const pokemons: number = 100;


// interface IPokemon that defines the shape of a pokemon object
interface IPokemon {
    id: number;
    name: string;
    image: string;
    type: string;
}


// it may take time to fetch data, so we'll use an asynchronous function that returns a Promise of type void.
// This last means that the function won't return a value.
const fetchData = (): void => {
    for (let i = 1; i <= pokemons; i++) {
        getPokemon(i);
    }
};

// @ts-ignore
const getPokemon = async (id: number): Promise<void> => {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon: any = await data.json();
    const pokemonType: string = pokemon.types
        .map((poke: any) => poke.type.name)
        .join(", ");

    // create a new object transformedPokemon that mirrors the interface IPokemon, and then pass it as an argument
    // to showPokemon()
    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    };

    showPokemon(transformedPokemon)
};
// the function showPokemon receives as a parameter the pokemon object of type IPokemon and returns void or no value
// to be precise. It will just append the content to the HTML file with the help of the id container
const showPokemon = (pokemon: IPokemon): void => {
    let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
    container.innerHTML += output
};

fetchData();