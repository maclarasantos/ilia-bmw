package org.maria;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.maria.controller.OrderController;
import org.maria.entity.OrderEntity;
import org.maria.entity.PersonEntity;
import org.maria.entity.ProductEntity;
import org.maria.service.OrderService;
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
public class OrderControllerTest {

    @Mock
    PersonService personService;

    @Mock
    OrderService orderService;

    @InjectMocks
    OrderController orderController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSave() {
        PersonEntity person = new PersonEntity();
        person.mail = "user@mail.com";
        ProductEntity product = new ProductEntity();
        product.id = 1L;
        OrderEntity order = new OrderEntity();
        order.person = person;
        order.product = product;

        when(personService.findByMail(person.mail)).thenReturn(null);
        Response response = orderController.save(order);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void testFindByMail() {
        String testEmail = "user@mail.com";
        Response response = orderController.findByMail(testEmail);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void testDelete() {
        Long orderId = 1L;
        doNothing().when(orderService).deleteOrder(orderId);
        Response response = orderController.delete(orderId);
        assertEquals(200, response.getStatus());
        verify(orderService).deleteOrder(orderId);
    }
}
