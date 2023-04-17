package com.saptak.recipe.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.saptak.recipe.entity.Profile;
import com.saptak.recipe.service.FirebaseAuthService;
import com.saptak.recipe.service.ProfileService;
import com.saptak.recipe.utils.ResponseUtil;
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

    @GetMapping(value= "/")
    public ResponseEntity<Map<String,Object>> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Get the profile
            Profile getProfile = profileService.getProfile(decodedToken.getUid());

            //? Check if profile was found
            if (getProfile == null) return ResponseUtil.errorUnauthorized();

            //? Return response
            return ResponseUtil.successGetProfile(getProfile);

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Map<String, Object>> getProfileById(@PathVariable("id") String id) {
        try {
            //? Get the profile by id
            Profile getProfileById = profileService.getProfileById(id);

            //? Check if profile was found
            if (getProfileById == null) return ResponseUtil.errorNotFound();

            //? Return response
            return ResponseUtil.successGetProfile(getProfileById);

        } catch (ExecutionException | InterruptedException e) {
            return ResponseUtil.errorNotFound();
        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Map<String, Object>> updateProfileById(@RequestHeader("Authorization") String authHeader,
                                                                 @PathVariable("id") String id,
                                                                 @RequestBody Profile profile) {
        try {
            //? Extract the token
            String token = authHeader.substring(7);

            //? Verify the JWT
            FirebaseToken decodedToken = firebaseAuthService.verifyToken(token);

            //? Set the profile id from the JWT
            profile.setId(decodedToken.getUid());

            //? Update in the database
            profileService.updateProfile(profile);

            //? Return response
            return ResponseUtil.successUpdateProfile();

        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            return ResponseUtil.errorUnauthorized();
        }
    }
}
