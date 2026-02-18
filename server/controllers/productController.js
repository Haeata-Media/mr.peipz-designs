const prisma = require('../config/db');
const cloudinary = require('../utils/cloudinary');

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { images: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: true },
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const { productSchema } = require('../utils/validators');

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, dimensions, materials, stock, isLimitedEdition, editionSize, image, dropDate } = req.body;
    
    // Validate input
    const validation = productSchema.safeParse({
      title, description, price: parseFloat(price), category, stock: parseInt(stock), 
      isLimitedEdition: isLimitedEdition === 'true' || isLimitedEdition === true,
      editionSize: editionSize ? parseInt(editionSize) : null,
      dropDate: dropDate ? new Date(dropDate).toISOString() : null
    });

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        dimensions,
        materials,
        stock: parseInt(stock),
        isLimitedEdition: isLimitedEdition === 'true' || isLimitedEdition === true,
        editionSize: editionSize ? parseInt(editionSize) : null,
        image,
        dropDate: dropDate ? new Date(dropDate) : null,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, dimensions, materials, stock, isLimitedEdition, editionSize, image, dropDate } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        dimensions,
        materials,
        stock: parseInt(stock),
        isLimitedEdition: isLimitedEdition === 'true' || isLimitedEdition === true,
        editionSize: editionSize ? parseInt(editionSize) : null,
        image,
        dropDate: dropDate ? new Date(dropDate) : null,
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.productImage.deleteMany({ where: { productId: parseInt(id) } }); // Clean up images logic
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
