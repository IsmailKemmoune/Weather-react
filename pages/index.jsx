import * as React from "react";
//import Image from "next/image";
import {
  Box,
  ChakraProvider,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Flex,
  Grid,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";

const weatherData = [
  {
    date: new Date("2020-11-30"),
    temperature: 25,
  },
  {
    date: new Date("2020-12-01"),
    temperature: 23,
  },
  {
    date: new Date("2020-12-02"),
    temperature: 10,
  },
  {
    date: new Date("2020-12-03"),
    temperature: 5,
  },
  {
    date: new Date("2020-12-04"),
    temperature: 20,
  },
  {
    date: new Date("2020-12-05"),
    temperature: 15,
  },
  {
    date: new Date("2020-12-06"),
    temperature: 18, // b7al haka tidir lah bach ticodi ljaw
  },
];

export default function Home() {
  //code

  return (
    <ChakraProvider>
      <Flex
        bgImage="url('/assets/bg.jpg')"
        backgroundSize="cover"
        h="100vh"
        direction="column"
      >
        <Box p={10} mb={10}>
          <Image src="/assets/Wlogo.png" />
        </Box>
        <Grid placeItems="center" w="full">
          <VStack spacing={28} w="full">
            <InputGroup size="lg" maxW="1000px">
              <Input
                h="60px"
                _focus={{ borderColor: "#8E5A49", borderWidth: "medium" }}
                placeholder="Find your location..."
                borderRadius="19px"
                bgColor="white"
              />
              <InputRightElement w="130px" h="100%" pr={2}>
                <Button
                  w="100%"
                  size="lg"
                  borderRadius="19px"
                  bgColor="#8E5A49"
                  color="white"
                  _hover={{ bgColor: "#5A4037" }}
                >
                  Find
                </Button>
              </InputRightElement>
            </InputGroup>
            <Flex>
              <HStack spacing={0}>
                {weatherData.map((weather, indx) => {
                  if (indx === 0)
                    return (
                      <Box w="300px" h="340px" mr={10}>
                        <Flex
                          justifyContent="space-between"
                          width="full"
                          padding="16px"
                          borderRadius="24px 0 0 0"
                          bgColor="rgba(255, 255, 255, 0.8)"
                          style={{ backdropFilter: "blur(5px)" }}
                        >
                          <Text fontWeight="bold">
                            {dayjs(weather.date).format("dddd")}
                          </Text>
                          <Text>{dayjs(weather.date).format("DD MMM")}</Text>
                        </Flex>
                        <Flex
                          bgColor="rgba(254, 254, 254, 0.5)"
                          borderRadius="0 0 0 24px"
                          alignItems="center"
                          justifyContent="center"
                          style={{ backdropFilter: "blur(5px)" }}
                          h="full"
                        >
                          <Text
                            fontSize={48}
                            color="white"
                            textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                          >
                            23°C
                          </Text>
                        </Flex>
                      </Box>
                    );
                  return (
                    <Box key={indx} w="130px" h="300px">
                      <Flex
                        justifyContent="center"
                        width="full"
                        padding="16px"
                        borderTopRightRadius={
                          indx === weatherData.length - 1 ? "24px" : null
                        }
                        bgColor={
                          indx % 2
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(200, 200, 200, 0.8)"
                        }
                        style={{ backdropFilter: "blur(5px)" }}
                      >
                        <Text fontWeight="bold">
                          {dayjs(weather.date).format("dddd")}
                        </Text>
                      </Flex>
                      <Flex
                        borderBottomRightRadius={
                          indx === weatherData.length - 1 ? "24px" : null
                        }
                        bgColor={
                          indx % 2
                            ? "rgba(255, 255, 255, 0.5)"
                            : "rgba(186, 185, 181, 0.5)"
                        }
                        alignItems="center"
                        justifyContent="center"
                        style={{ backdropFilter: "blur(5px)" }}
                        h="full"
                      >
                        <Text
                          fontSize={32}
                          color="white"
                          textShadow="0px 4px 4px rgba(0, 0, 0, 0.5)"
                        >
                          {weather.temperature}°C
                        </Text>
                      </Flex>
                    </Box>
                  );
                })}
              </HStack>
            </Flex>
          </VStack>
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}
