package com.saptak.recipe.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.saptak.recipe.entity.Recipe;
import com.saptak.recipe.service.FirebaseAuthService;
import com.saptak.recipe.service.RecipeService;
import com.saptak.recipe.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(value = "/api/recipe")
@CrossOrigin
public class RecipeController {

    @Autowired
    FirebaseAuthService firebaseAuthService;

    @Autowired
    RecipeService recipeService;

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String, Object>> getAllRecipes(@RequestHeader("Authorization") String authHeader) throws FirebaseAuthException {

        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Get all recipes for the profile
            List<Recipe> allRecipesByProfileId = recipeService.getAllRecipe(decodedToken.getUid());

            //? Return response
            return ResponseUtil.successGetMany(allRecipesByProfileId);

        } catch (ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @GetMapping(value = "/query")
    public ResponseEntity<Map<String, Object>> getRecipeByQuery(@RequestParam(defaultValue = "", required = false) String name,
                                                                @RequestParam(defaultValue = "", required = false) String author){
        try {
            //? Get the recipe by query
            List<Recipe> recipeByQuery = recipeService.getRecipeByQuery(name, author);

            //? Check if recipes were found
            if (recipeByQuery == null) return ResponseUtil.errorNotFound();

            //? Return response
            return ResponseUtil.successGetMany(recipeByQuery);

        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Map<String, Object>> getRecipeById(@PathVariable("id") String id) {

        try {
            //? Get the recipe by the id
            Recipe recipeById = recipeService.getRecipeById(id);

            //? Check if the recipe was found
            if (recipeById == null) return ResponseUtil.errorNotFound();

            //? Return response
            return ResponseUtil.successGetOne(recipeById);

        } catch (ExecutionException | InterruptedException e) {
            return ResponseUtil.errorNotFound();
        }
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Map<String, Object>> addRecipe(@RequestHeader("Authorization") String authHeader,
                                                         @RequestBody Recipe recipe) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            recipe.setProfileId(decodedToken.getUid());

            //? Set the author from thom the profile
            recipe.setAuthor(decodedToken.getName());

            //? Add and save in the database
            recipeService.addRecipe(recipe);

            //? Return response
            return ResponseUtil.successAddOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }

    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Map<String, Object>> updateRecipeById(@RequestHeader("Authorization") String authHeader,
                                                                @PathVariable("id") String id,
                                                                @RequestBody Recipe recipe) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodeToken = firebaseAuthService.verifyToken(token);

            //? Set the profileId from the JWT
            recipe.setProfileId(decodeToken.getUid());

            //? Set the author from the profile
            recipe.setAuthor(decodeToken.getName());

            //? Update and save in the database
            recipeService.updateRecipeById(id, recipe);

            //? Return response
            return ResponseUtil.successUpdateOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteRecipeById(@RequestHeader("Authorization") String authHeader,
                                                                @PathVariable("id") String id) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            firebaseAuthService.verifyToken(token);

            //? Delete recipe by id
            recipeService.deleteRecipeById(id);

            //? Return response
            return ResponseUtil.successDeleteOne();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

}
