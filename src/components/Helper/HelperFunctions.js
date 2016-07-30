import React from 'react';
import Pokemon from '~/assets/data/Pokemon.json';
import Dust from '~/assets/data/Dust.json';

export function getPokemonList() {
  return Pokemon.map((p) => (p.name)).sort();
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
