import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  height: 100vh;
  background-color: rgb(100, 100, 100);
  padding-top: 200px;
`;

const InnerContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`;

const RowItem = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
`;

const RowTitle = styled.div`
  width: 100px;
  text-align: center;
`;
  
const PlayerCashInput = styled.input`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid black;
  text-align: center;
  margin: 0 auto;
`;

const PlayerNameInput = styled.input`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid black;
  text-align: center;
  margin: 0 auto;
`;

export { Container, InnerContainer, PlayerCashInput, PlayerNameInput, RowItem, RowTitle };