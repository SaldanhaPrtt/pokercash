import { Container, InnerContainer, PlayerCashInput, RowItem, RowTitle, PlayerNameInput } from './styles';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

type Player = {
	id: number,
	name: string,
	dinheiroColocado: number,
	dinheiroFinal: number,
	dinheiroDevido?: number
}

function App() {
	const [players, setPlayers] = useState<Player[]>([]);

	const handleAddPlayer = () => {
		setPlayers([...players, { id: players.length, name: '', dinheiroColocado: 0, dinheiroFinal: 0 }]);
	}

	const handleRemovePlayer = (id: number) => {
		setPlayers(players.filter((player) => player.id !== id));
	}

	const editPlayerName = (id: number, value: string) => {
		setPlayers(prevPlayers => {
			return prevPlayers.map(player => {
				if (player.id === id) {
					return { ...player, name: value };
				}
				return player;
			});
		});
	}

	const editPlayerCash = (id: number, value: number) => {
		setPlayers(prevPlayers => {
			return prevPlayers.map(player => {
				if (player.id === id) {
					return { ...player, dinheiroColocado: value };
				}
				return player;
			});
		});
	}

	const editPlayerFinalCash = (id: number, value: number) => {
		setPlayers(prevPlayers => {
			return prevPlayers.map(player => {
				if (player.id === id) {
					return { ...player, dinheiroFinal: value };
				}
				return player;
			});
		});
	}

	var N = players.length;
	function getMin(arr: number[]) {
		var minInd = 0;
		for (let i = 1; i < N; i++)
			if (arr[i] < arr[minInd])
				minInd = i;
		return minInd;
	}

	function getMax(arr: number[]) {
		var maxInd = 0;
		for (let i = 1; i < N; i++)
			if (arr[i] > arr[maxInd])
				maxInd = i;
		return maxInd;
	}

	function minOf2(x: number, y: number) {
		return (x < y) ? x : y;
	}

	function minCashFlowRec(amount: number[]) {
		var mxCredit = getMax(amount), mxDebit = getMin(amount);
		if (amount[mxCredit] == 0 && amount[mxDebit] == 0)
			return;

		var min = minOf2(-amount[mxDebit], amount[mxCredit]);
		amount[mxCredit] -= min;
		amount[mxDebit] += min;

		document.write("<br>Person " + mxDebit + " pays " + min + " to " + "Person " + mxCredit);
		minCashFlowRec(amount);
	}

	function minCashFlow(graph: number[][]) {
		var amount = Array.from({ length: N }, (_, i) => 0);
		for (let p = 0; p < N; p++)
			for (let i = 0; i < N; i++)
				amount[p] += (graph[i][p] - graph[p][i]);

		minCashFlowRec(amount);
	}

	return (
		<Container>
			<Button onClick={() => handleAddPlayer()}>Add Player</Button>
			<InnerContainer>
				{players && players.map((player, index) => (
					<RowItem>
						<PlayerNameInput
							type="text"
							placeholder="Player Name"
							value={player.name}
							onChange={(event: any) => editPlayerName(player.id, event.target.value)}
						/>
						<PlayerCashInput
							type="number"
							placeholder="$"
							value={player.dinheiroColocado}
							onChange={(event: any) => editPlayerCash(player.id, event.target.value)}
						/>
						<Button onClick={() => handleRemovePlayer(player.id)}>Remove</Button>
					</RowItem>
				))}
			</InnerContainer>
		</Container>
	);
}

export default App;
