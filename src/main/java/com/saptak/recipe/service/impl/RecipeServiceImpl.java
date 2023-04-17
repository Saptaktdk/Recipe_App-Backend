package com.saptak.recipe.service.impl;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.saptak.recipe.entity.Recipe;
import com.saptak.recipe.query.RecipeQueryBuilder;
import com.saptak.recipe.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {
    @Autowired
    private final Firestore firestore;

    private final String recipeCollection = "recipe";

    public RecipeServiceImpl(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public List<Recipe> getAllRecipe(String profileId) throws ExecutionException, InterruptedException {
        CollectionReference recipes = firestore.collection(recipeCollection);

        //? Get all the recipes
        Query query = recipes.whereEqualTo("profileId", profileId);

        QuerySnapshot querySnapshot = query.get().get();
        List<QueryDocumentSnapshot> recipeDocuments = querySnapshot.getDocuments();

        //? Handle if empty
        if (recipeDocuments.isEmpty()) {
            return Collections.emptyList();
        }

        //? Parse documents
        return recipeDocuments.stream()
                .map(queryDocumentSnapshot -> queryDocumentSnapshot.toObject(Recipe.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Recipe> getRecipeByQuery(String name, String author) throws ExecutionException, InterruptedException, NullPointerException {
        CollectionReference recipeCollectionRef = firestore.collection(recipeCollection);

        //? Build the query
        Query query = recipeCollectionRef;
        query = RecipeQueryBuilder.buildQuery(query, name, author);

        //? Query in the db
        QuerySnapshot querySnapshot = query.get().get();
        List<QueryDocumentSnapshot> recipeDocuments = querySnapshot.getDocuments();

        return recipeDocuments.stream().map(queryDocumentSnapshot -> queryDocumentSnapshot
                .toObject(Recipe.class))
                .collect(Collectors.toList());
    }

    @Override
    public Recipe getRecipeById(String id) throws ExecutionException, InterruptedException {
        CollectionReference recipe = firestore.collection(recipeCollection);
        DocumentReference recipeDocument = recipe.document(id);
        DocumentSnapshot recipeSnapshot = recipeDocument.get().get();

        if(!recipeSnapshot.exists()) return null;

        return recipeSnapshot.toObject(Recipe.class);
    }

    @Override
    public String addRecipe(Recipe recipe) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection(recipeCollection)
                                                              .document().set(recipe);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String updateRecipeById(String id, Recipe recipe) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection(recipeCollection)
                                                              .document().set(recipe);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String deleteRecipeById(String id) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection(recipeCollection)
                                                              .document(id).delete();
        return collectionApiFuture.get().getUpdateTime().toString();
    }
}
