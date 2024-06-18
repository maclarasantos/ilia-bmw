package org.maria.controller;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.maria.entity.PersonEntity;
import org.maria.service.PersonService;
import org.maria.service.ProductsService;

import java.util.List;

@Path("/person")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonController {

    private final PersonService personService;

    @Inject
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @POST
    @Transactional
    public Response createUser(PersonEntity person) {
        return Response.ok(personService.createUser(person)).build();
    }

    @GET
    public Response listAll(@QueryParam("page") @DefaultValue("0") Integer page,
                            @QueryParam("pageSize") @DefaultValue("10") Integer pageSize) {
        List<PersonEntity> persons = personService.listAll(page, pageSize);
        return Response.ok(persons).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        PersonEntity person = personService.findById(id);
        return Response.ok(person).build();
    }

    @GET
    @Path("/{mail}")
    public Response findById(@PathParam("mail") String mail) {
        PersonEntity person = personService.findByMail(mail);
        return Response.ok(person).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response uptadePerson(@PathParam("id") Long id, PersonEntity personParam) {
        return Response.ok(personService.update(id, personParam)).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        personService.delete(id);
        return Response.noContent().build();
    }

}
