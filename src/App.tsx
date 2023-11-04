import { Container, InnerContainer, PlayerCashInput, RowItem, RowTitle, PlayerNameInput } from './styles';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

type Player = {
	id: number,
	name?: string,
	buyIn?: number,
	cashOut?: number,
	dinheiroDevido?: number
}

type PayOffs = {
	owns: string,
	ownsId: number,
	owned: string,
	ownedId: number,
	value: number
}
function App() {
	const [players, setPlayers] = useState<Player[]>([]);
	const [payOffs, setPayOffs] = useState<PayOffs[]>([]);
	const [calculated, setCalculated] = useState<boolean>();

	const handleAddPlayer = () => {
		setPlayers([...players, { id: players.length }]);
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
					return { ...player, buyIn: value };
				}
				return player;
			});
		});
	}

	const editPlayerFinalCash = (id: number, value: number) => {
		setPlayers(prevPlayers => {
			return prevPlayers.map(player => {
				if (player.id === id) {
					return { ...player, cashOut: value };
				}
				return player;
			});
		});
	}

	function calculateValues() {

	}


	return (
		<Container>
			<Button onClick={() => handleAddPlayer()}>Add Player</Button>
			<InnerContainer>
				{players && players.map((player, index) => (
					<RowItem key={player.id}>
						<PlayerNameInput
							type="text"
							placeholder="Nome"
							value={player.name}
							onChange={(event: any) => editPlayerName(player.id, event.target.value)}
						/>
						<PlayerCashInput
							type="number"
							placeholder="Buy In"
							value={player.buyIn}
							onChange={(event: any) => editPlayerCash(player.id, event.target.value)}
						/>
						<PlayerCashInput
							type="number"
							placeholder="Cash Out"
							value={player.cashOut}
							onChange={(event: any) => editPlayerFinalCash(player.id, event.target.value)}
						/>
						<Button onClick={() => handleRemovePlayer(player.id)}>Remove</Button>
					</RowItem>
				))}
			</InnerContainer>
			<Button onClick={() => calculateValues()}>Calcular</Button>
		</Container>
	);
}

export default App;
