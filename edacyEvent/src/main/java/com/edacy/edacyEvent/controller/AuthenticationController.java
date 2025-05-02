package com.edacy.edacyEvent.controller;

import com.edacy.edacyEvent.dtos.LoginResponse;
import com.edacy.edacyEvent.dtos.LoginUserDto;
import com.edacy.edacyEvent.dtos.RegisterUserDto;
import com.edacy.edacyEvent.entity.User;
import com.edacy.edacyEvent.service.AuthenticationService;
import com.edacy.edacyEvent.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/auth")
@RestController
@CrossOrigin(origins = "*")
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setId(authenticatedUser.getId());
        loginResponse.setTelephone(authenticatedUser.getTelephone());
        loginResponse.setAdresse(authenticatedUser.getAdresse());
        loginResponse.setEmail(authenticatedUser.getEmail());
        loginResponse.setUsername(authenticatedUser.getUsername());
        loginResponse.setFullName(authenticatedUser.getFullName());
        loginResponse.setProfile(authenticatedUser.getProfile());
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        /*loginResponse.setNeedsPasswordChange(authenticatedUser.isNeedsPasswordChange());
        loginResponse.setStore(StoreMapper.entityToDto(authenticatedUser.getStore()));
*/

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/refresh-token")
        public ResponseEntity<LoginResponse> refreshToken(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        if (username != null) {
            User userDetails =   authenticationService.extractUserDetails(username);
            String newAccessToken = jwtService.generateToken(userDetails);
            String newRefreshToken = jwtService.generateRefreshToken(userDetails);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setEmail(userDetails.getEmail());
            loginResponse.setUsername(userDetails.getUsername());
            loginResponse.setFullName(userDetails.getFullName());
            loginResponse.setProfile(userDetails.getProfile());
            loginResponse.setToken(newAccessToken);
            loginResponse.setRefreshToken(newRefreshToken);
            return ResponseEntity.ok(loginResponse);


        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse());
        }
    }
  /*@PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
      User authenticatedUser = authenticationService.authenticate(loginUserDto);
      String jwtToken;
       jwtToken = jwtService.generateToken(authenticatedUser);

      //String existingToken = authenticatedUser.getToken(); // Assume the login DTO has a token field


      if (jwtToken != null && jwtService.canTokenBeRefreshed(jwtToken)) {
          jwtToken = jwtService.refreshToken(jwtToken);
      } else {
          jwtToken = jwtService.generateToken(authenticatedUser);
      }

      LoginResponse loginResponse = new LoginResponse();
      loginResponse.setEmail(authenticatedUser.getEmail());
      loginResponse.setUsername(authenticatedUser.getUsername());
      loginResponse.setFullName(authenticatedUser.getFullName());
      loginResponse.setToken(jwtToken);
      loginResponse.setExpiresIn(jwtService.getExpirationTime());

      return ResponseEntity.ok(loginResponse);
  }*/
}