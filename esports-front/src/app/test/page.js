'use client'
import React, { useState, useEffect } from 'react';

const test = () => {
    const initialPlayers = ['ahmad', 'abdullah', 'hassan', 'mohammed', 'saleh', 'saeed', 'khaled', 'messi'];
    const [players, setPlayers] = useState(initialPlayers);
    const [matches, setMatches] = useState([]);
    const [round, setRound] = useState(1);
  
    useEffect(() => {
      setMatches(createMatches(players));
    }, [players]);
  
    function createMatches(playerList) {
      const matchPairs = [];
      for (let i = 0; i < playerList.length; i += 2) {
        if (i + 1 < playerList.length) {
          matchPairs.push([playerList[i], playerList[i + 1]]);
        }
      }
      return matchPairs;
    }
  
    function handleWin(winner, loser) {
      const updatedPlayers = players.filter(player => player !== loser);
  
      if (updatedPlayers.length === 1) {
        alert(`${winner} is the winner!`);
        resetTournament();
      } else {
        setPlayers([...updatedPlayers.filter(player => player !== winner), winner]);
      }
    }
  
    function resetTournament() {
      setPlayers(initialPlayers);
      setRound(1);
    }
  
    useEffect(() => {
      if (players.length > 1) {
        setRound(round + 1);
      }
    }, [players]);
  
    return (
      <div>
        <h1>Round {round}</h1>
        {matches.map((match, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <button onClick={() => handleWin(match[0], match[1])}>{match[0]}</button> vs <button onClick={() => handleWin(match[1], match[0])}>{match[1]}</button>
          </div>
        ))}
      </div>
    );
  }


export default test;
