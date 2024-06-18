package org.maria.controller;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.maria.entity.PersonEntity;
import org.maria.entity.OrderEntity;
import org.maria.service.OrderService;
import org.maria.service.PersonService;

import java.util.List;

@Path("/quote")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class OrderController {

    private final PersonService personService;
    private final OrderService orderService;

    @Inject
    public OrderController(PersonService personService, OrderService orderService) {
        this.personService = personService;
        this.orderService = orderService;
    }

    @GET
    @Path("/{email}")
    public Response findByMail(@PathParam("email") String email) {
        PersonEntity person = personService.findByMail(email);
        List<OrderEntity> orders = orderService.findByPerson(person);
        return Response.ok(orders).build();
    }

    @PUT
    @Transactional
    public Response save(OrderEntity order) {
        PersonEntity person = personService.findByMail(order.person.mail);
        if (person == null) {
            order.person = personService.createUser(order.person);
        } else {
            order.person = personService.update(person.id, order.person);
        }
        orderService.saveQuote(order);
        return Response.ok().build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        orderService.deleteOrder(id);
        return Response.ok().build();
    }
}
