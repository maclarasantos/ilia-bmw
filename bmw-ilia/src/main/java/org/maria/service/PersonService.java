package org.maria.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.maria.entity.PersonEntity;
import org.maria.exception.PersonNotFoundException;

import java.lang.reflect.Field;
import java.util.List;

@ApplicationScoped
public class PersonService {

    public List<PersonEntity> listAll(Integer page, Integer pageSize) {
        return PersonEntity.findAll().page(page, pageSize).list();
    }

    public PersonEntity findById(Long personId) {
        return (PersonEntity) PersonEntity.findByIdOptional(personId).
                        orElseThrow(PersonNotFoundException::new);
    }

    public PersonEntity findByMail(String mail) {
        return PersonEntity.find("mail", mail).firstResult();
    }

    public PersonEntity update(Long id, PersonEntity personParam) {
        PersonEntity person = findById(id);
        PersonEntity personUpdated = copyNonNullProperties(personParam, person);
        personUpdated.persist();
        return personUpdated;
    }


    public <T> T copyNonNullProperties(T source, T target) {
        Field[] fields = source.getClass().getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(source);
                if (value != null) {
                    Field targetField = target.getClass().getDeclaredField(field.getName());
                    targetField.setAccessible(true);
                    targetField.set(target, value);
                }
            } catch (NoSuchFieldException | IllegalAccessException e) {
                // Ignore fields that don't exist in the target or are not accessible
            }
        }
        return target;
    }

    public void delete(Long id) {
        findById(id);
        PersonEntity.deleteById(id);
    }

    public PersonEntity createUser(PersonEntity personEntity) {
        personEntity.persist();
        return personEntity;
    }
}
