package org.maria.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.maria.entity.PersonEntity;
import org.maria.entity.OrderEntity;
import java.util.List;

@ApplicationScoped
public class OrderService {

    public void saveQuote(OrderEntity order) {
        order.persist();
    }

    public List<OrderEntity> findByPerson(PersonEntity person) {
        return OrderEntity.list("person", person);
    }

    public void deleteOrder(Long id) {
        OrderEntity.deleteById(id);
    }
}
