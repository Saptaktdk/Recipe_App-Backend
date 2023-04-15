package com.saptak.recipe.service.impl;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.saptak.recipe.entity.Profile;
import com.saptak.recipe.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private final Firestore firestore;

    private final String profileCollection = "profile";

    public ProfileServiceImpl(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public Profile getProfile(String profileId) throws ExecutionException, InterruptedException {
        CollectionReference profile = firestore.collection(profileCollection);
        DocumentReference profileDocument = profile.document(profileId);
        DocumentSnapshot profileSnapshot = profileDocument.get().get();

        if(!profileSnapshot.exists()) return null;

        return profileSnapshot.toObject(Profile.class);
    }

    @Override
    public Profile getProfileById(String id) throws ExecutionException, InterruptedException {
        CollectionReference profile = firestore.collection(profileCollection);
        DocumentReference profileDocument = profile.document(id);
        DocumentSnapshot profileSnapshot = profileDocument.get().get();

        if(!profileSnapshot.exists()) return null;

        return profileSnapshot.toObject(Profile.class);

    }

    @Override
    public String updateProfile(Profile profile) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection(profileCollection)
                                                              .document().set(profile);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
}
