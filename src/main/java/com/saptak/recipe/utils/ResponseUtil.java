package com.saptak.recipe.utils;

import com.saptak.recipe.entity.Recipe;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseUtil {
    public static final int HTTP_STATUS_OK = 200;
    public static final int HTTP_STATUS_CREATED = 201;
    public static final int HTTP_STATUS_UPDATED = 201;
    public static final int HTTP_STATUS_DELETED = 201;
    public static final int HTTP_STATUS_BAD_REQUEST = 400;
    public static final int HTTP_STATUS_UNAUTHORIZED = 403;
    public static final int HTTP_STATUS_NOT_FOUND = 404;
    public static final int HTTP_STATUS_LIMIT_EXCEEDED = 429;
    public static final int HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
    public static final int HTTP_STATUS_PARSING_ERROR = 500;

    //? Success GetOne
    public static ResponseEntity<Map<String, Object>> successGetOne(Recipe recipe) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HTTP_STATUS_OK);
        response.put("message", "Recipe Item found");
        response.put("data", recipe);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
