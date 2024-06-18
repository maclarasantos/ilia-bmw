package org.maria.exception;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class PersonNotFoundMapper implements ExceptionMapper<PersonNotFoundException> {

    @Override
    public Response toResponse(PersonNotFoundException e) {
        return Response.status(Response.Status.NOT_FOUND.getStatusCode(), "User not found").build();
    }
}
