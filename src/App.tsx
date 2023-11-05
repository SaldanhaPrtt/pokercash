import { Container, InnerContainer, PaymentContainer, PlayerCashInput, RowItem, RowTitle, PlayerNameInput } from './styles';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

type Player = {
	id: number,
	name?: string,
	buyIn?: number,
	cashOut?: number,
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
		let transactions: any = [];
		players.forEach((player) => {
			if (player && player.buyIn && player.cashOut) {
				let transaction = {
					playerId: player.id,
					playerName: player.name,
					amount: player.cashOut - player.buyIn as number,
				};
				transactions.push(transaction)
			}
		})

		// Find players who owe money and players who are owed money
		const debtors: string[] = transactions.filter(
			(player: any) => player.amount < 0
		);
		const creditors: string[] = transactions.filter(
			(player: any) => player.amount > 0
		);

		// Settle the debts
		const payOffs: any = [];
		debtors.forEach((debtor: any) => {
			creditors.forEach((creditor: any) => {
				if (creditor.amount > 0) {
					const payment = Math.min(Math.abs(debtor.amount), creditor.amount);
					debtor.amount += payment;
					creditor.amount -= payment;
					console.log(`${debtor.playerName} pays ${creditor.playerName}: $${payment}`);
					payOffs.push({
						owns: debtor.playerName,
						ownsId: debtor.playerId,
						owned: creditor.playerName,
						ownedId: creditor.playerId,
						value: payment
					});
					setPayOffs(payOffs);
				}
			});
		});
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
			<PaymentContainer>
				{payOffs && payOffs.map((payOff, index) => (
					<>
						{payOff.value > 0 && (
							<RowItem key={index}>
								<RowTitle>{payOff.owns}</RowTitle>
								<RowTitle>{payOff.value}</RowTitle>
								<RowTitle>{payOff.owned}</RowTitle>
							</RowItem>
						)}
					</>
				))}
			</PaymentContainer>
		</Container>
	);
}

export default App;
