package com.saptak.recipe.utils;

import com.saptak.recipe.entity.Profile;
import com.saptak.recipe.entity.Recipe;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
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

    //? Success GetProfile
    public static ResponseEntity<Map<String, Object>> successGetProfile(Profile profile) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HTTP_STATUS_OK);
        response.put("message", "Profile found");
        response.put("data", profile);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //? Success GetMany
    public static ResponseEntity<Map<String,Object>> successGetMany(List<Recipe> recipeList) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HTTP_STATUS_OK);
        response.put("message", String.format("%s recipe(s) found", recipeList.size()));
        response.put("data", recipeList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //? Success AddOne
    public static ResponseEntity<Map<String, Object>> successAddOne() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HTTP_STATUS_CREATED);
        response.put("message", "Recipe added successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //? Success UpdateOne
    public static ResponseEntity<Map<String, Object>> successUpdateOne() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HTTP_STATUS_UPDATED);
        response.put("message", "Recipe updated successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //? Success UpdateProfile
    public static ResponseEntity<Map<String, Object>> successUpdateProfile() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HTTP_STATUS_UPDATED);
        response.put("message", "Profile updated successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //? Success DeleteOne
    public static ResponseEntity<Map<String,Object>> successDeleteOne(){
        Map<String,Object> response = new HashMap<>();
        response.put("status",HTTP_STATUS_DELETED);
        response.put("message","Item deleted successfully");
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    //? Error Bad Request
    public static ResponseEntity<Map<String,Object>> errorBadRequest(){
        Map<String,Object> response = new HashMap<>();
        response.put("status",HTTP_STATUS_BAD_REQUEST);
        response.put("error","Bad Request!");
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    //? Error Unauthorized
    public static ResponseEntity<Map<String,Object>> errorUnauthorized(){
        Map<String,Object> response = new HashMap<>();
        response.put("status",HTTP_STATUS_UNAUTHORIZED);
        response.put("error","Unauthorized! Invalid token");
        return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);
    }

    //? Error Not Found
    public static ResponseEntity<Map<String,Object>> errorNotFound(){
        Map<String,Object> response = new HashMap<>();
        response.put("status",HTTP_STATUS_NOT_FOUND);
        response.put("error","Error not found!");
        return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
    }


    //? Error Internal Server
    public static ResponseEntity<Map<String,Object>> errorInternalServer(){
        Map<String,Object> response = new HashMap<>();
        response.put("status",HTTP_STATUS_INTERNAL_SERVER_ERROR);
        response.put("error","Internal Server Error!");
        return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //? Error Limit Exceeded
    public static ResponseEntity<Map<String,Object>> errorLimitExceeded(){
        Map<String,Object> response = new HashMap<>();
        response.put("status",HTTP_STATUS_LIMIT_EXCEEDED);
        response.put("error","Query Limit Exceeded!");
        return new ResponseEntity<>(response,HttpStatus.TOO_MANY_REQUESTS);
    }

    //? Error Parsing entity
    public static ResponseEntity<Map<String,Object>> errorParsingEntity(String errorMsg){
        Map<String,Object> response = new HashMap<>();
        response.put("status",HTTP_STATUS_PARSING_ERROR);
        response.put("error",errorMsg);
        return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
