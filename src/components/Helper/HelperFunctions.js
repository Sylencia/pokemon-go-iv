import React from 'react';
import Pokemon from '~/assets/data/Pokemon.json';
import Dust from '~/assets/data/Dust.json';

export function getPokemonList() {
  return Pokemon.filter((p) => (p.isActive)).map((p) => (p.name)).sort();
}

export function getDustList() {
  return Dust.map((d) => (d.cost)).sort((a, b) => (a - b));
}

export function getPokemonData(entry) {
  const pkmn = Pokemon.find((pokemon) =>
    (pokemon.name.toLowerCase().trim() === entry.toLowerCase().trim()));
  if (pkmn !== null && pkmn !== undefined) {
    return pkmn;
  }
  return {};
}

export function getPokemonStats(pokemon, ivAtk, ivDef, ivStam, multiplier) {
  return ({
    attack: (pokemon.baseAtk + ivAtk) * multiplier,
    defense: (pokemon.baseDef + ivDef) * multiplier,
    stamina: (pokemon.baseStam + ivStam) * multiplier,
  });
}

export function calculateCP(atk, def, stam) {
  return Math.max(10, Math.floor(Math.sqrt(stam) * atk * Math.sqrt(def) * 0.1));
}

export function getOffensivePotential(pkmn, attack, defense, stamina) {
  const finalPokemon = getPokemonData(pkmn.finalEvolution);

  const stamRatio = finalPokemon.baseStam / (finalPokemon.baseStam + finalPokemon.baseDef);
  const defRatio = 1 - stamRatio;
  // Attack can count for 15, Def+Stam can count for 6
  return (attack + 0.4 * stamRatio * stamina + 0.4 * defRatio * defense) / 21 * 100;
}

export function getDefensivePotential(pkmn, attack, defense, stamina) {
  const finalPokemon = getPokemonData(pkmn.finalEvolution);

  // Gym pokemon have 2x health
  const stamRatio = 2 * finalPokemon.baseStam / (2 * finalPokemon.baseStam + finalPokemon.baseDef);
  const defRatio = 1 - stamRatio;
  // Stam+Def count for 30, attack counts for 3.
  return (2 * defRatio * defense + 2 * stamRatio * stamina + 0.2 * attack) / 33 * 100;
}

export function getDustData(input) {
  return Dust.find((dust) =>
    (dust.cost === input));
}

// stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
export function validateNumericEntry(number) {
  return number >>> 0 === parseFloat(number) && number > 0;
}

export function validateLevelEntry(number) {
  return validateNumericEntry(number) && number <= 40;
}

export function validateDustEntry(number) {
  if (number === '') {
    return false;
  }

  const dustData = Dust.find((dust) =>
    (dust.cost === Number(number)));
  return dustData !== null && dustData !== undefined;
}

export function validatePokemonEntry(entry) {
  if (entry === '') {
    return false;
  }

  const pkmn = Pokemon.find((pokemon) =>
    (pokemon.name.toLowerCase().trim() === entry.toLowerCase().trim()));
  return pkmn !== null && pkmn !== undefined;
}

export function getValidityIcon(success) {
  if (success) {
    return <i className="fa fa-check" aria-hidden="true"></i>;
  }

  return <i className="fa fa-times" aria-hidden="true"></i>;
}

export function getBestString(stam, atk, def) {
  let bestString = '';
  if (stam) {
    bestString += 's';
  }
  if (atk) {
    bestString += 'a';
  }
  if (def) {
    bestString += 'd';
  }

  return bestString;
}
