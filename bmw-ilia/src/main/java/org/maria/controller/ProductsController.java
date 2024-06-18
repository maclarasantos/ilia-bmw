package org.maria.controller;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.maria.entity.ProductEntity;
import org.maria.service.ProductsService;

import java.util.List;

@Path("/Products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductsController {

    private final ProductsService productsService;

    @Inject
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GET
    public Response listAll(@QueryParam("page") @DefaultValue("0") Integer page,
                            @QueryParam("pageSize") @DefaultValue("100") Integer pageSize) {
        List<ProductEntity> products = productsService.listAll(page, pageSize);
        return Response.ok(products).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Integer id) {
        ProductEntity product = productsService.findById(id);
        return Response.ok(product).build();
    }
}
