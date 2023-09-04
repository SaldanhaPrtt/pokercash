import { Container, InnerContainer, PlayerCashInput, AddPlayerButton, RowItem, RowTitle, PlayerNameInput } from './styles.js';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = () => {
    setPlayers([...players, { id: players.length }]);
  }

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  }

	var N = 3;
	function getMin(arr)
	{
		var minInd = 0;
		for (let i = 1; i < N; i++)
			if (arr[i] < arr[minInd])
				minInd = i;
		return minInd;
	}
	
	function getMax(arr)
	{
		var maxInd = 0;
		for (let i = 1; i < N; i++)
			if (arr[i] > arr[maxInd])
				maxInd = i;
		return maxInd;
	}
	
	function minOf2(x , y)
	{
		return (x < y) ? x: y;
	}
	
	function minCashFlowRec(amount)
	{
		var mxCredit = getMax(amount), mxDebit = getMin(amount);
		if (amount[mxCredit] == 0 && amount[mxDebit] == 0)
			return;
	
		var min = minOf2(-amount[mxDebit], amount[mxCredit]);
		amount[mxCredit] -= min;
		amount[mxDebit] += min;
	
		document.write("<br>Person " + mxDebit + " pays " + min	+ " to " + "Person " + mxCredit);
		minCashFlowRec(amount);
	}

	function minCashFlow(graph)
	{
		var amount=Array.from({length: N}, (_, i) => 0);
		for (let p = 0; p < N; p++)
		for (let i = 0; i < N; i++)
			amount[p] += (graph[i][p] - graph[p][i]);
	
		minCashFlowRec(amount);
	}

  return (
    <Container>
      <InnerContainer>
        {players && players.map((player, index) => (
        <RowItem>
          <PlayerNameInput
          type="text"
          placeholder="Player Name"
          value={player.name}
          onChange={(event) => setPlayers(...players, { name: event.target.value })}
          />
          <PlayerCashInput
          type="number"
          placeholder="$"
          value={player.score}
          onChange={(event) => setPlayers(event.target.value)}
          />
          <Button onClick={() => handleRemovePlayer(player.id)}>Remove</Button>
        </RowItem>
        ))}
        <Button onClick={() => handleAddPlayer()}>Add Player</Button>
      </InnerContainer>
    </Container>
  );
}

export default App;
