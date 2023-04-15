package com.saptak.recipe.service;

import com.saptak.recipe.entity.Profile;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;


@Service
public interface ProfileService {

    Profile getProfile(String profileId) throws ExecutionException, InterruptedException;

    Profile getProfileById(String id) throws ExecutionException, InterruptedException;

    String updateProfile(Profile profile) throws ExecutionException, InterruptedException;

}
