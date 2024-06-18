package org.maria.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "person")
public class PersonEntity extends PanacheEntity {

    public String name;
    public String mail;
    public String cellphone;
}
