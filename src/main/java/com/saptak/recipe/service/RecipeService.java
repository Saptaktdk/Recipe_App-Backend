package com.saptak.recipe.service;

import com.saptak.recipe.entity.Recipe;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface RecipeService {
    List<Recipe> getAllRecipe() throws ExecutionException, InterruptedException;

    List<Recipe> getRecipeByQuery(String name,
                                  String author) throws ExecutionException, InterruptedException, NullPointerException;

    Recipe getRecipeById(String id) throws ExecutionException, InterruptedException;

    String addRecipe(Recipe recipe) throws ExecutionException, InterruptedException;

    String updateRecipeById(String id, Recipe recipe) throws ExecutionException, InterruptedException;

    String deleteRecipeById(String id) throws ExecutionException, InterruptedException;
}
