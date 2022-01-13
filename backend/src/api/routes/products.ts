import ProductService from '@/services/product.service';
import { Router, Request, Response } from 'express';
import Container from 'typedi';
// import middlewares from '../middlewares';

import { ProductInput } from './../../models/products.model';
const route = Router();

export default (app: Router) => {
  app.use('/products', route);

  route.post('/registerProduct', async (req: Request, res: Response) => {
    try {
      const productService = Container.get(ProductService);
      const product = await productService.registerProduct(req.body as ProductInput);
      return res.json(product).status(201);
    } catch (error) {
      return res.status(500).end();
    }
  });

  route.post('/updateProduct', async (req: Request, res: Response) => {
    try {
      const productService = Container.get(ProductService);
      const product = await productService.updateProduct(req.body as ProductInput);
      return res.json(product).status(200);
    } catch (error) {
      return res.status(500).end();
    }
  });

  route.get('/', async (req: Request, res: Response) => {
    try {
      const productService = Container.get(ProductService);
      const products = await productService.getProducts();
      return res.json(products).status(200);
    } catch (error) {
      res.status(500).end();
    }
  });

  route.get('/delete/:id', async (req: Request, res: Response) => {
    try {
      const productService = Container.get(ProductService);
      const products = await productService.deleteProduct(parseInt(req.params.id));
      return res.status(200).end();
    } catch (error) {
      res.status(500).end();
    }
  });
};
