package com.saptak.recipe.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Profile {
    @DocumentId
    private String id;

    private String name;

    private String email;
}
