import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { Product } from '@/data/types/product';
import { products as initialProducts } from '@/data/products';

interface EditableProduct extends Omit<Product, 'id'> {
  id?: number;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<EditableProduct | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize products from the existing data
  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Save products data as JSON (in real app, this would be an API call)
  const saveProductsData = (updatedProducts: Product[]) => {
    const jsonData = JSON.stringify(updatedProducts, null, 2);
    console.log('Saved Products JSON:', jsonData);
    
    // Simulate saving to localStorage for persistence
    localStorage.setItem('productListingData', jsonData);
  };

  // Handle adding/updating product
  const handleSaveProduct = () => {
    if (!editingProduct) return;

    if (isEditing && editingProduct.id) {
      // Update existing product
      const updatedProducts = products.map(p =>
        p.id === editingProduct.id ? { ...editingProduct as Product } : p
      );
      setProducts(updatedProducts);
      saveProductsData(updatedProducts);
      toast.success('Product updated successfully!');
    } else {
      // Add new product
      const newId = Math.max(...products.map(p => p.id)) + 1;
      const newProduct: Product = {
        ...editingProduct,
        id: newId,
        slug: editingProduct.name.toLowerCase().replace(/\s+/g, '-'),
        rating: 0,
        image: editingProduct.image || 'https://via.placeholder.com/300x300?text=No+Image'
      } as Product;
      
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      saveProductsData(updatedProducts);
      toast.success('Product added successfully!');
    }

    setIsDialogOpen(false);
    setEditingProduct(null);
    setIsEditing(false);
  };

  // Handle deleting product
  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    saveProductsData(updatedProducts);
    toast.success('Product deleted successfully!');
  };

  // Open dialog for adding new product
  const handleAddNew = () => {
    setEditingProduct({
      name: '',
      price: 0,
      originalPrice: 0,
      category: '',
      brand: '',
      description: '',
      image: '',
      slug: '',
      rating: 0,
      specs: [],
      tags: []
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  // Open dialog for editing existing product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with search and add button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            
            {editingProduct && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <Input
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        name: e.target.value
                      })}
                      placeholder="Enter product name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value) || 0
                      })}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Original Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingProduct.originalPrice || ''}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        originalPrice: parseFloat(e.target.value) || undefined
                      })}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Input
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        category: e.target.value
                      })}
                      placeholder="Enter category"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Brand</label>
                    <Input
                      value={editingProduct.brand}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        brand: e.target.value
                      })}
                      placeholder="Enter brand"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <Input
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        image: e.target.value
                      })}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      description: e.target.value
                    })}
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingProduct(null);
                      setIsEditing(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProduct}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Product
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Products table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg border"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Original Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/48x48?text=No+Image';
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium max-w-xs truncate">
                  {product.name}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '-'}
                </TableCell>
                <TableCell>{product.rating}/5</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No products found matching your search.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductTable;
