import { useColorModeValue } from '@/components/ui/color-mode';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useProductStore } from '@/store/product';
import { NewProductType } from '@/types/types';
import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState<NewProductType>({
        name: '',
        price: '',
        image: '',
    });
    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        
        if (!success) {
            toaster.create({
                title: 'Error',
                description: message,
                type: 'error',
            });
        } else {
            toaster.create({
                title: 'Success',
                description: message,
                type: 'success',
            });
        }
        setNewProduct({
            name: '',
            price: '',
            image: '',
        });
    };

    return (
        <Container maxW={'container.sm'}>
            <VStack gap={4}>
                <Heading as={'h1'} size={'5xl'} textAlign={'center'} mb={8}>
                    Create New Product
                </Heading>

                <Box
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    p={6}
                    rounded={'lg'}
                    shadow={'md'}
                >
                    <VStack gap={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                })
                            }
                        />

                        <Input
                            placeholder="Price"
                            name="price"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                })
                            }   
                        />

                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    image: e.target.value,
                                })
                            }
                        />

                        <Button
                            bg={'blue.500'}
                            w={'full'}
                            color={'#fefefe'}
                            onClick={handleAddProduct}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
            <Toaster />
        </Container>
    );
};

export default CreatePage;
