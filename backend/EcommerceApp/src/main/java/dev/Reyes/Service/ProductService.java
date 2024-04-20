package dev.Reyes.Service;
import dev.Reyes.Repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import dev.Reyes.Entity.Product;

@Service
@Transactional
public class ProductService {
    ProductRepository productRepository;
    @Autowired
    public ProductService(ProductRepository productRepository) { this.productRepository = productRepository; }

    public List<Product> getAllProducts(){
        return (List<Product>) productRepository.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        return (List<Product>) productRepository.getProductsByCategory(category);
    }
    public List<Product> getProductsBySearch(String product_name) {
        return (List<Product>) productRepository.getProductBySearch(product_name);
    }
    public int updateStock(Integer product_id, Integer quantity){
        return productRepository.updateStock(product_id, quantity);
    }
}