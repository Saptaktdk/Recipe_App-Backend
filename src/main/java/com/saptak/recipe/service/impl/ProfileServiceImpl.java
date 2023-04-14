package com.saptak.recipe.service.impl;

import com.saptak.recipe.entity.Profile;
import com.saptak.recipe.service.ProfileService;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class ProfileServiceImpl implements ProfileService {
    @Override
    public Profile getProfile() throws ExecutionException, InterruptedException {
        return null;
    }

    @Override
    public Profile getProfileById(String id) throws ExecutionException, InterruptedException {
        return null;
    }

    @Override
    public String updateProfile(Profile profile) throws ExecutionException, InterruptedException {
        return null;
    }
}
