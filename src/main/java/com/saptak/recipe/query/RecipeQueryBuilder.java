package com.saptak.recipe.query;

import com.google.cloud.firestore.Query;

public class RecipeQueryBuilder {
    public static Query buildQuery(Query query, String name, String author) {

        //? Build the query
        if (name != null && name.length() > 0) {
            query = query.whereEqualTo("name", name);
        }

        if (author != null && author.length() > 0) {
            query = query.whereEqualTo("author", author);
        }

        return query;
    }
}
