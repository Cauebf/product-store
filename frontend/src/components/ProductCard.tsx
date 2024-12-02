import { ProductType } from '@/types/types';
import {
    Box,
    Button,
    DialogFooter,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    DialogBody,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from '@/components/ui/dialog';
import { Toaster, toaster } from '@/components/ui/toaster';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '@/store/product';
import { useState } from 'react';

const ProductCard = ({ product }: { product: ProductType }) => {
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState<ProductType>(product);
    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (id: string) => {
        const { success, message } = await deleteProduct(id);

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
    };

    const handleUpdateProduct = async (
        id: string,
        updatedProduct: ProductType
    ) => {
        const { success, message } = await updateProduct(id, updatedProduct);
        setIsDialogOpen(false);

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
    };

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{
                transform: 'translateY(-5px)',
                shadow: 'xl',
            }}
            bg={bg}
        >
            <Image
                src={product.image}
                alt={product.name}
                objectFit={'cover'}
                h={'150px'}
                w={'full'}
            />

            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>

                <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
                    color={textColor}
                    mb={4}
                >
                    ${product.price}
                </Text>

                <HStack gap={2}>
                    <IconButton bg={'#84b6f4'}>
                        <TbEdit
                            color="white"
                            onClick={() => setIsDialogOpen(true)}
                        />
                    </IconButton>
                    <IconButton
                        bg={'#ff6961'}
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <MdDeleteOutline color="white" />
                    </IconButton>
                </HStack>
            </Box>

            <DialogRoot open={isDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb="4">
                        <VStack gap={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => {
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        name: e.target.value,
                                    });
                                }}
                            />
                            <Input
                                placeholder="Price"
                                name="price"
                                value={updatedProduct.price}
                                onChange={(e) => {
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        price: e.target.value,
                                    });
                                }}
                            />
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => {
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        image: e.target.value,
                                    });
                                }}
                            />
                        </VStack>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant={'outline'}
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorPalette="blue"
                            onClick={() =>
                                handleUpdateProduct(product._id, updatedProduct)
                            }
                        >
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>

            <Toaster />
        </Box>
    );
};

export default ProductCard;
