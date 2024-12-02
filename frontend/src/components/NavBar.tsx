import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { Link } from 'react-router-dom';

import { FaRegSquarePlus } from 'react-icons/fa6';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const buttonStyle = {
        bg: useColorModeValue('#0e0e0e', 'gray.700'),
        _hover: {
            bg: useColorModeValue('#333333', 'gray.600'),
        },
        color: '#fefefe',
    };

    return (
        <Container maxW={'1140px'} px={4}>
            <Flex
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexDir={{
                    base: 'column',
                    md: 'row',
                }}
            >
                <Text
                    fontSize={{ base: '22px', sm: '28px' }}
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    textAlign={'center'}
                    bgGradient={'to-r'}
                    gradientFrom={'cyan.400'}
                    gradientTo={'blue.500'}
                    bgClip={'text'}
                >
                    <Link to={'/'}>Product Store 🛒</Link>
                </Text>

                <HStack gap={2} alignItems={'center'}>
                    <Link to={'/create'}>
                        <Button {...buttonStyle}>
                            <FaRegSquarePlus fontSize={20} color="#fefefe" />
                        </Button>
                    </Link>

                    <Button onClick={toggleColorMode} {...buttonStyle}>
                        {colorMode === 'light' ? (
                            <IoMoon />
                        ) : (
                            <LuSun size={20} />
                        )}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default NavBar;
