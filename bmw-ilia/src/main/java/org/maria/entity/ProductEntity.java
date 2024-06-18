package org.maria.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
public class ProductEntity extends PanacheEntity {

    public String url;
    public String name;
    public String description;
    public Double price;
    public Type type;

}
