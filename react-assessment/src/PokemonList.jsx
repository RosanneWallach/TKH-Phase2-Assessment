import React from 'react';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())


function PokemonList() {
    const { data, error, isLoading } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=10000', fetcher)
    console.log(data)
    if (error) return <div>failed to load list of pokemon</div>
    if (isLoading) return <div>loading...</div>

    // render data
    return <div>
        <h2>List of all Pokemon<br/>({data.count})</h2>
        <table>
            <tr>
                <th>Number</th>
                <th>Pokemon Name</th>
            </tr>
        {data['results'].map((item, i) => {
            return <tr>
                <td>
                    {i + 1}
                </td>
                <td>
                    <p>{item.name}</p>
                </td>
            </tr>
        })}
        </table>
    </div>
    //return <div>Hello</div>
}

export default PokemonList;