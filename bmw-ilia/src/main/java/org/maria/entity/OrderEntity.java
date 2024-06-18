package org.maria.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class OrderEntity extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "person_id")
    public PersonEntity person;

    @ManyToOne
    @JoinColumn(name = "product_id")
    public ProductEntity product;
}
