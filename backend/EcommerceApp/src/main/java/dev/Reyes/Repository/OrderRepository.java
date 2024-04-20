package dev.Reyes.Repository;


import dev.Reyes.Entity.Orders;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface OrderRepository extends CrudRepository<Orders, Integer> {
}
