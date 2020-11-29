import React, { useEffect, useState } from "react";
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
  StatHelpText,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import axios from "axios";

export default function Home() {
  const [city, setCity] = useState("");
  const onChange = (event) => {
    setCity(event.target.value);
  };

  const [weather, setWeather] = useState();

  const findWeather = async () => {
    const { data: weatherData } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=25c4022c54dd549be0edcf5dbfc5c535&units=metric`
    );
    const coord = weatherData.city.coord;

    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,current&appid=25c4022c54dd549be0edcf5dbfc5c535&units=metric`
    );
    setWeather(data.daily.slice(0, 7));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      findWeather();
    }
  };

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
                onChange={onChange}
                onKeyDown={handleKeyDown}
              />
              <InputRightElement w="130px" h="100%" pr={2}>
                <Button
                  w="100%"
                  size="lg"
                  borderRadius="19px"
                  bgColor="#8E5A49"
                  color="white"
                  _hover={{ bgColor: "#5A4037" }}
                  onClick={findWeather}
                >
                  Find
                </Button>
              </InputRightElement>
            </InputGroup>
            <Flex>
              <HStack spacing={0}>
                {weather &&
                  weather.map((ljaw, indx) => {
                    if (indx === 0)
                      return (
                        <Box w="300px" h="340px" mr={10} key={indx}>
                          <Flex
                            justifyContent="space-between"
                            width="full"
                            padding="16px"
                            borderRadius="24px 0 0 0"
                            bgColor="rgba(255, 255, 255, 0.8)"
                            style={{ backdropFilter: "blur(5px)" }}
                          >
                            <Text fontWeight="bold">
                              {dayjs.unix(ljaw.dt).format("dddd")}
                            </Text>
                            <Text>{dayjs.unix(ljaw.dt).format("DD MMM")}</Text>
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
                              {Math.trunc(ljaw.temp.day)}°C
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
                            indx === weather.length - 1 ? "24px" : null
                          }
                          bgColor={
                            indx % 2
                              ? "rgba(255, 255, 255, 0.8)"
                              : "rgba(200, 200, 200, 0.8)"
                          }
                          style={{ backdropFilter: "blur(5px)" }}
                        >
                          <Text fontWeight="bold">
                            {dayjs.unix(ljaw.dt).format("dddd")}
                          </Text>
                        </Flex>
                        <Flex
                          borderBottomRightRadius={
                            indx === weather.length - 1 ? "24px" : null
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
                            {Math.trunc(ljaw.temp.day)}°C
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
