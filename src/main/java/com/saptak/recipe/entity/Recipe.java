package com.saptak.recipe.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Recipe {
    @DocumentId
    private String id;

    private String profileId;

    private String name;

    private String ingredients;

    private String directions;

    private String author;

}
