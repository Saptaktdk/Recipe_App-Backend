package com.saptak.recipe.query;

import com.google.cloud.firestore.Query;

public class RecipeQueryBuilder {
    public static Query buildQuery(Query query, String name, String author) {
        //? Build the query
        query = query
                .whereEqualTo("name",name)
                .whereEqualTo("author", author);
    }
}
