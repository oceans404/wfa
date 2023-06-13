import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  extendTheme,
  Text,
  Container,
  HStack,
  Button,
} from '@chakra-ui/react';

import { Web3Button } from '@web3modal/react';
import { useAccount } from 'wagmi';

import ServiceCard from './ServiceCard';
import AddSecret from './AddSecret';
import './App.css';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

function App() {
  const { address, isConnected } = useAccount();
  // todo: add signed in with ENS ui

  // check if wallet is part of data dao

  // if it's part of data dao get mapping of wallet address -> encrypted collection on Polybase

  // these secrets are currently hardcoded but will come from Polybase or some encrypted db
  // todo: decrypt secret then display cards
  const [cards, setCards] = useState([
    // these are fake accounts and fake secrets
    {
      name: 'Google: test@google.com',
      secret: 'j22h ni4e cd4o hqrx fka7 7uye wf2d xh77',
    },
    {
      name: 'Instagram: @steph',
      secret: 'tcwb oqj3 f3p3 5lca iarf dpqv rhc6 5iwt',
    },
    {
      name: process.env.REACT_APP_FALLBACK_SERVICE_NAME,
      secret: process.env.REACT_APP_FALLBACK_SERVICE_SECRET,
    },
  ]);

  const encryptAndSaveSecret = secretData => {
    // todo: encrypt and post to Polybase
    console.log(secretData);
    setCards(cards => [
      {
        name: `${secretData.Service}: ${secretData.Account}`,
        secret: secretData.Secret,
      },
      ...cards,
    ]);
  };

  return (
    <ChakraProvider theme={extendTheme({ config })}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Container>
              <HStack justifyContent={'space-between'}>
                <Text
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                  fontSize="4xl"
                  fontWeight="bold"
                >
                  My OTPs
                </Text>
                <div>
                  {isConnected && address && (
                    <AddSecret saveSecret={encryptAndSaveSecret} />
                  )}
                  <Button padding={'0'} marginLeft={2}>
                    <Web3Button icon="hide" />
                  </Button>
                </div>
              </HStack>

              {cards.map(c => (
                <ServiceCard key={c.name} name={c.name} secret={c.secret} />
              ))}
            </Container>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
