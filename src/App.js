import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Textarea,
  Heading,
  Flex,
  Input,
  GridItem,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

//longer data with array.length > 50 for testing purpose
  /*[{ name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 },
    { name: 'sd', weight: '1', value: -0.02 },
    { name: 'B', weight: 3, value: 0.05 },
    { name: 'C', weight: 6, value: 0.015 },
    { name: 'D', weight: 2, value: -0.01 },
    { name: 'E', weight: 3, value: 0.01 }]
    */

function App() {
  const sampleData = "[ { name: 'A', weight: 3, value: -0.02 }, { name: 'B', weight: 3, value: 0.05 }, { name: 'C', weight: 6, value: 0.015 }, { name: 'D', weight: 2, value: -0.01 }, { name: 'E', weight: 3, value: 0.01 } ]"
  const reg = /(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g;
  const [data, setData] = useState(JSON.parse(sampleData.replace(reg, '$1"$3":').replace(/'/g, '"')));
  const [rawInput, setrawInput] = useState("[ { name: 'A', weight: 3, value: -0.02 }, { name: 'B', weight: 3, value: 0.05 }, { name: 'C', weight: 6, value: 0.015 }, { name: 'D', weight: 2, value: -0.01 }, { name: 'E', weight: 3, value: 0.01 } ]");
  const [rowNumber, setrowNumber] = useState(3);
  const [dataFormatFlag, setdataFormatFlag] = useState(true);
  const [rowFormatFlag, setrowFormatFlag] = useState(true);
  const [message, setMessage] = useState(
    'Please correct the format of your input.'
  );

  const handleRowNumber = () => {
    return 'repeat(' + rowNumber + ', auto)';
  };
  const handleColNumber = () => {
    return typeof data == 'object' ? 'repeat(' + data.length + ', auto)' : '1fr';
  };
  const checkNumSign = grid => {
    if (grid.value === 0) {
      return 'gray';
    }
    if (Math.sign(grid.value) === 1) {
      return 'green';
    } else {
      return 'red';
    }
  };

  const checkDataFormat = e => {
    setrawInput(e.target.value);
    const input = reg.test(e.target.value)
      ? JSON.parse(e.target.value.replace(reg, '$1"$3":').replace(/'/g, '"'))
      : e.target.value;
    setData(input);

    if (!reg.test(e.target.value)) {
      setMessage('Please enter a valid JSON.');
      setData('');
      setdataFormatFlag(false);
      return;
    }
    
    // check if data is empty
    if (input === '') {
      setMessage('Please enter the array of data.');
      setData('');
      setdataFormatFlag(false);
      return;
    }
    // check if data.length <= 50
    if (input.length > 50) {
      setMessage('The length of the array of data is too long.');
      setData('');
      setdataFormatFlag(false);
      return;
    }
    // check if data.name is string and less than 50 characters, and if data.weight is an integer
    for (let i = 0; i < input.length; i++) {
      if (typeof input[i].name !== 'string' || input[i].name.length > 50) {
        setMessage(
          'The name in the array of data must be string and less than 50 characters.'
        );
        setData('');
        setdataFormatFlag(false);
        return;
      }
      if (input[i].weight % 1 !== 0) {
        setMessage('The weight in the array of data must be an integer.');
        setData('');
        setdataFormatFlag(false);
        return;
      }
    }
    setdataFormatFlag(true);
  };
  const checkRowFormat = e => {
    const input = e.target.value;
    setrowNumber(input);
    // check if input is empty
    if (input === '') {
      setMessage('Please enter the row number.');
      setrowFormatFlag(false);
      return;
    }
    // check if input is a negative number or zero
    if (input <= 0) {
      setMessage('Please enter your input correctly.');
      setrowFormatFlag(false);
      return;
    }
    // check if input is bigger than the length of the array
    if (input > data.length) {
      setMessage(
        'The number of row should be smaller or equal to the length of the array of data.'
      );
      setrowFormatFlag(false);
      return;
    }
    // check if input is a float number, if so then reset to an integer
    if (input % 1 !== 0) {
      setrowNumber(parseInt(input));
    }

    setrowFormatFlag(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="left" fontSize="xl" p={4}>
        <Flex alignItems="center" mb={4}>
          <Heading size="md">Simple version Treemap - by Anthony Lau</Heading>
          <Spacer />
          <ColorModeSwitcher />
        </Flex>
        <Grid
          minH="100vh"
          p={3}
          templateColumns={['1fr', '1fr', '20% 1fr']}
          gap={10}
        >
          <VStack spacing={4} alignItems="left">
            <Box>
              <Heading as="h4" size="md" mb={2}>
                Data
              </Heading>
              <Textarea
                placeholder="Please input an array of data"
                value={rawInput}
                onChange={checkDataFormat}
                isInvalid={!dataFormatFlag}
              ></Textarea>
            </Box>
            <Box>
              <Heading as="h4" size="md" mb={2}>
                Row Number
              </Heading>
              <Input
                type="number"
                placeholder="Please input an integer"
                value={rowNumber}
                onChange={checkRowFormat}
                isInvalid={!rowFormatFlag}
              ></Input>
            </Box>
          </VStack>
          <Box>
            <Heading as="h4" size="md" mb={2}>
              Result
            </Heading>
            {rowFormatFlag && dataFormatFlag ? (
              <Grid
                h="500px"
                templateRows={handleRowNumber}
                templateColumns={handleColNumber}
                gridAutoFlow="column"
                gap={1}
                textAlign="center"
              >
                {
                  data.map((gridData, index) => (
                    <GridItem
                      key={index}
                      d="grid"
                      placeItems="center"
                      colSpan={gridData.weight * 2}
                      bg={checkNumSign(gridData)}
                    >
                      <Box>
                        <Text fontWeight="bold">{gridData.name}</Text>
                        <Text>
                          {Math.round(gridData.value * 100) !==
                          gridData.value * 100
                            ? (gridData.value * 100).toFixed(2)
                            : gridData.value * 100}
                          %
                        </Text>
                      </Box>
                    </GridItem>
                  ))
                }
              </Grid>
            ) : (
              <Heading size="lg" textAlign="center" color="red">
                {message}
              </Heading>
            )}
          </Box>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
