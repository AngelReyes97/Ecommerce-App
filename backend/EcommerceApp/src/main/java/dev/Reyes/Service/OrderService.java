package dev.Reyes.Service;

import dev.Reyes.Entity.Orders;
import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.Reyes.Repository.OrderRepository;

import java.util.List;

@Service
@Transactional
public class OrderService {

    OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) { this.orderRepository = orderRepository; }

    public List<Orders> addNewOrder(List<Orders> order){
        return (List<Orders>) orderRepository.saveAll(order);
    }
}
