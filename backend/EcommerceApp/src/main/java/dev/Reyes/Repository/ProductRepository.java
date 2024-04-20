package dev.Reyes.Repository;

import dev.Reyes.Entity.Product;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
    @Query("FROM Product p WHERE p.category = :category")
    List<Product> getProductsByCategory(@Param("category") String category);

    @Query("FROM Product p WHERE LOWER(p.product_name) LIKE '%' || LOWER(:product_name) || '%'")
    List<Product> getProductBySearch(@Param("product_name") String product_name);

    @Modifying
    @Query("UPDATE Product p SET p.quantity = p.quantity - :quantity WHERE p.product_id = :product_id")
    int updateStock(@Param("product_id") Integer product_id, @Param("quantity") Integer quantity);
}
