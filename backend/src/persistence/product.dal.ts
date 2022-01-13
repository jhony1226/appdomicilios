import { ProductInput, ProductOutput } from '@/models/products.model';
import ProductRepository from './../repository/products.rep';
import db from '@/loaders/postgresql';
import Logger from '@/loaders/logger';

export default class ProductDalService implements ProductRepository {
  async registerProduct(product: ProductInput): Promise<ProductOutput> {
    const query = {
      text: `INSERT INTO PRODUCTS(NAME, CATEGORY_ID, PURCHASE_BUY, SALE_PRICE, INVENTORY) 
            VALUES($1, $2, $3, $4, $5) RETURNING ID`,
      values: [product.name, product.category.id, product.purchase_buy, product.sale_price, product.inventory],
    };
    try {
      const res = await db.query(query);
      const id: { id: number } = res.rows[0];
      return { ...id, ...product };
    } catch (err) {
      Logger.error(`Error SQL => ${err}`);
      throw err;
    }
  }

  async updateProduct(product: ProductInput): Promise<ProductOutput> {
    const query = {
      text: `UPDATE PRODUCTS 
              SET NAME = $1, 
                  CATEGORY_ID = $2, 
                  PURCHASE_BUY = $3, 
                  SALE_PRICE = $4, 
                  INVENTORY = $5 
              WHERE ID = $6`,
      values: [
        product.name,
        product.category.id,
        product.purchase_buy,
        product.sale_price,
        product.inventory,
        product.id,
      ],
    };
    try {
      await db.query(query);
      return product;
    } catch (err) {
      Logger.error(`Error SQL => ${err}`);
      throw err;
    }
  }

  public async getProducts(): Promise<ProductOutput[]> {
    try {
      const query = {
        text: 'SELECT P.*, C.NAME AS CATEGORY_NAME FROM PRODUCTS P INNER JOIN CATEGORIES C ON P.CATEGORY_ID = C.CATEGORY_ID ORDER BY ID DESC',
      };
      const res = await db.query(query);
      const productsList: ProductOutput[] = [];
      for (const product of res.rows) {
        const newProduct: ProductOutput = {
          id: product.id,
          name: product.name,
          category: {
            id: product.category_id,
            name: product.category_name,
          },
          purchase_buy: product.purchase_buy,
          sale_price: product.sale_price,
          inventory: product.inventory,
        };

        productsList.push(newProduct);
      }
      return productsList;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProduct(id: number): Promise<void> {
    try {
      const query = {
        text: `DELETE FROM PRODUCTS WHERE ID = $1`,
        values: [id],
      };
      await db.query(query);
    } catch (error) {
      throw error;
    }
  }
}
