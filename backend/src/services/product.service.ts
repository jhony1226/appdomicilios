import ProductRepository from '@/repository/products.rep';
import { ProductInterface } from '@/utils/helpers';
import { Service } from 'typedi';
import { ProductOutput, ProductInput } from './../models/products.model';

@Service()
export default class ProductService {
  constructor(@ProductInterface() private productsInterface: ProductRepository) {}

  public async registerProduct(product: ProductInput): Promise<ProductOutput> {
    try {
      return await this.productsInterface.registerProduct(product);
    } catch (error) {
      throw error;
    }
  }

  public async updateProduct(product: ProductInput): Promise<ProductOutput> {
    try {
      return await this.productsInterface.updateProduct(product);
    } catch (error) {
      throw error;
    }
  }

  public async getProducts(): Promise<ProductOutput[]> {
    try {
      return await this.productsInterface.getProducts();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteProduct(id: number): Promise<void> {
    try {
      await this.productsInterface.deleteProduct(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
