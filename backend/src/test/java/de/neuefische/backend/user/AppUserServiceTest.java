package de.neuefische.backend.user;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class AppUserServiceTest {

    @Test
    void createUser_WhenUserExistsThenThrowResponseStatusException() {
        //given
        AppUser appUser = new AppUser("","user","password");
        AppUserRepository appUserRepository = mock(AppUserRepository.class);
        when(appUserRepository.findByUsername(appUser.getUsername()))
                .thenReturn(Optional.of(appUser));

        BCryptPasswordEncoder passwordEncoder= mock(BCryptPasswordEncoder.class);
        when(passwordEncoder.encode(appUser.getPassword())).thenReturn("123");

        //when
        AppUserService appUserService = new AppUserService(appUserRepository,passwordEncoder);

        // then
        assertThrows(ResponseStatusException.class, () -> appUserService.create(appUser));

        verify(appUserRepository).findByUsername(appUser.getUsername());
    }

    @Test
    void createUser_WhenNoUserExistsThenReturnCreatedUserSuccessfully() {
        //given
        AppUser appUser = new AppUser("","user","password");
        AppUserRepository appUserRepository = mock(AppUserRepository.class);
        when(appUserRepository.findByUsername(appUser.getUsername()))
                .thenReturn(Optional.ofNullable(null));

        BCryptPasswordEncoder passwordEncoder= mock(BCryptPasswordEncoder.class);
        when(passwordEncoder.encode(appUser.getPassword())).thenReturn("123");

        //when
        AppUserService appUserService = new AppUserService(appUserRepository,passwordEncoder);
        AppUser actual = appUserService.create(appUser);

        // then
        assertEquals(new AppUser("","user",""),actual);

        verify(appUserRepository).findByUsername(appUser.getUsername());
    }

    @Test
    void findByUsername_WhenNoUserFoundThenReturnOptionalOfNull() {
        //given
        AppUserRepository appUserRepository = mock(AppUserRepository.class);
        when(appUserRepository.findByUsername("non-existing-username"))
                .thenReturn(Optional.ofNullable(null));

        //when
        AppUserService appUserService = new AppUserService(appUserRepository,new BCryptPasswordEncoder());
        Optional<AppUser> actual = appUserService.findByUsername("non-existing-username");

        //then
        assertEquals(Optional.ofNullable(null),actual );
        verify(appUserRepository).findByUsername("non-existing-username");
    }

    @Test
    void findByUsername_WhenExistingUserFoundThenReturnOptionalOfExistingUser() {
        //given
        AppUserRepository appUserRepository = mock(AppUserRepository.class);
        when(appUserRepository.findByUsername("user"))
                .thenReturn(Optional.of(new AppUser("","user","123")));

        //when
        AppUserService appUserService = new AppUserService(appUserRepository,new BCryptPasswordEncoder());
        Optional<AppUser> actual = appUserService.findByUsername("user");

        //then
        assertEquals(Optional.of(new AppUser("","user","123")), actual);
        verify(appUserRepository).findByUsername("user");
    }

    @Test
    void findByUsernameWithoutPassword_WhenNoUserFoundThenReturnOptionalOfNull() {
        //given
        AppUserRepository appUserRepository = mock(AppUserRepository.class);
        when(appUserRepository.findByUsername("non-existing-username"))
                .thenReturn(Optional.ofNullable(null));

        //when
        AppUserService appUserService = new AppUserService(appUserRepository,new BCryptPasswordEncoder());
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword("non-existing-username");

        //then
        assertEquals(Optional.ofNullable(null),actual );
        verify(appUserRepository).findByUsername("non-existing-username");
    }

    @Test
    void findByUsernameWithoutPassword_WhenExistingUserFoundThenReturnOptionalOfExistingUser() {
        //given
        AppUserRepository appUserRepository = mock(AppUserRepository.class);
        when(appUserRepository.findByUsername("user"))
                .thenReturn(Optional.of(new AppUser("","user","123")));

        //when
        AppUserService appUserService = new AppUserService(appUserRepository,new BCryptPasswordEncoder());
        Optional<AppUser> actual = appUserService.findByUsernameWithoutPassword("user");

        //then
        assertEquals(Optional.of(new AppUser("","user","")), actual);
        verify(appUserRepository).findByUsername("user");
    }

}