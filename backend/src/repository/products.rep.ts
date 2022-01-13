import { ProductInput, ProductOutput } from '@/models/products.model';

export default interface ProductRepository {
  //findProduct
  getProducts(): Promise<ProductOutput[]>;
  registerProduct(product: ProductInput): Promise<ProductOutput>;
  updateProduct(product: ProductInput): Promise<ProductOutput>;
  deleteProduct(id: number): Promise<void>;
}
