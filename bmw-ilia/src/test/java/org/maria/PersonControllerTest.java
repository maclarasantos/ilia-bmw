package org.maria;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.maria.controller.PersonController;
import org.maria.entity.PersonEntity;
import org.maria.service.PersonService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import jakarta.ws.rs.core.Response;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@QuarkusTest
@ExtendWith(MockitoExtension.class)
public class PersonControllerTest {

    @Mock
    PersonService personService;

    @InjectMocks
    PersonController personController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateUser() {
        PersonEntity person = new PersonEntity();
        person.mail = "user@mail.com";

        when(personService.createUser(any(PersonEntity.class))).thenReturn(person);

        Response response = personController.createUser(person);
        assertEquals(200, response.getStatus());
        verify(personService).createUser(any(PersonEntity.class));
    }

    @Test
    public void testListAll() {
        List<PersonEntity> persons = List.of(new PersonEntity(), new PersonEntity());
        when(personService.listAll(0, 10)).thenReturn(persons);

        Response response = personController.listAll(0, 10);
        assertEquals(200, response.getStatus());
        verify(personService).listAll(0, 10);
    }

    @Test
    public void testFindById() {
        Long personId = 1L;
        PersonEntity person = new PersonEntity();
        when(personService.findById(personId)).thenReturn(person);

        Response response = personController.findById(personId);
        assertEquals(200, response.getStatus());
        verify(personService).findById(personId);
    }

    @Test
    public void testFindByMail() {
        String testEmail = "user@mail.com";
        PersonEntity person = new PersonEntity();
        when(personService.findByMail(testEmail)).thenReturn(person);

        Response response = personController.findById(testEmail);
        assertEquals(200, response.getStatus());
        verify(personService).findByMail(testEmail);
    }

    @Test
    public void testUpdatePerson() {
        Long personId = 1L;
        PersonEntity person = new PersonEntity();
        when(personService.update(personId, person)).thenReturn(person);

        Response response = personController.uptadePerson(personId, person);
        assertEquals(200, response.getStatus());
        verify(personService).update(personId, person);
    }

    @Test
    public void testDelete() {
        Long personId = 1L;
        doNothing().when(personService).delete(personId);

        Response response = personController.delete(personId);
        assertEquals(204, response.getStatus());
        verify(personService).delete(personId);
    }
}
