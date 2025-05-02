package com.edacy.edacyEvent.service;



import com.edacy.edacyEvent.dtos.LoginUserDto;
import com.edacy.edacyEvent.dtos.RegisterUserDto;
import com.edacy.edacyEvent.entity.User;
import com.edacy.edacyEvent.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;


    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder, JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User signup(RegisterUserDto input) {
        if(input.getId()==0){
            User user = new User();
            user.setFullName(input.getFullName());
            user.setEmail(input.getEmail());
            if(input.getPassword().equals("")){
                user.setPassword(passwordEncoder.encode("123456"));
               // user.setNeedsPasswordChange(true);
            }else{
                user.setPassword(passwordEncoder.encode(input.getPassword()));
            //    user.setNeedsPasswordChange(false);
            }
            user.setAdresse(input.getAdresse());
            user.setTelephone(input.getTelephone());
            user.setProfile(input.getProfile());


            return userRepository.save(user);
        }else{
            User user=userRepository.findById((int) input.getId()).orElseThrow(() -> new IllegalArgumentException("User not found"));

            user.setPassword(passwordEncoder.encode(input.getPassword()));
            user.setAdresse(input.getAdresse());
            user.setEmail(input.getEmail());
            user.setTelephone(input.getTelephone());
            user.setFullName(input.getFullName());
            user.setProfile(input.getProfile());
            return userRepository.save(user);


        }

    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }



    public User extractUserDetails(String username) {

        return userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}