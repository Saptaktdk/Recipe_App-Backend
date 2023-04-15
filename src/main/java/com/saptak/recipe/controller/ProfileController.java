package com.saptak.recipe.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.saptak.recipe.entity.Profile;
import com.saptak.recipe.service.FirebaseAuthService;
import com.saptak.recipe.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(value="/api/profile")
@CrossOrigin
public class ProfileController {
    @Autowired
    FirebaseAuthService firebaseAuthService;

    @Autowired
    ProfileService profileService;

    @GetMapping(value="")
    public ResponseEntity<Map<String,Object>> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Get the profile
            Profile getProfile = profileService.getProfile(decodedToken.getUid());

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return null;
        }
    }
}
