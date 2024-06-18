package org.maria.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.maria.entity.ProductEntity;
import org.maria.exception.PersonNotFoundException;

import java.util.List;

@ApplicationScoped
public class ProductsService {

    public List<ProductEntity> listAll(Integer page, Integer pageSize) {
        return ProductEntity.findAll().page(page, pageSize).list();
    }

    public ProductEntity findById(Integer personId) {
        return (ProductEntity) ProductEntity.findByIdOptional(personId).
                orElseThrow(PersonNotFoundException::new);
    }
}
