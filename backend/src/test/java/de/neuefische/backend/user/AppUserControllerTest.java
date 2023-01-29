package de.neuefische.backend.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AppUserRepository appUserRepository;

    @Test
    void create_whenCreateUserSuccessfullyThenReturnCreatedAppUser() throws Exception {
        String requestBody = """
                {
                    "username": "user",
                    "password": "123"
                }
                """;
        String expected = """
                {
                    "username": "user",
                    "password": ""
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content().json(expected));
    }

    @Test
    void create_whenAppUserAlreadyExistsThenConflict() throws Exception {
        String requestBody = """
                {
                    "username": "user",
                    "password": "123"
                }
                """;
        String expected = """
                {
                    "username": "user",
                    "password": ""
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content().json(expected));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isConflict());

    }

    @Test
    @WithMockUser(username = "user",password = "123")
    void login_whenAppUserExistsThenReturn200AndAppUser() throws Exception {

        appUserRepository.save(new AppUser("abc", "user", "123"));

        String expected = """
                {
                    "id": "abc",
                    "username": "user",
                    "password": ""
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/login"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content().json(expected));
    }

    @Test
    void login_whenAppUserNotExistThen401() throws Exception {
        String requestBody = """
                {
                    "username": "user",
                    "password": "123"
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user",password = "123")
    void me_whenLoggedInThenReturnAppUserData() throws Exception {

        appUserRepository.save(new AppUser("abc", "user", "123"));

        String expected = """
                {
                    "id": "abc",
                    "username": "user",
                    "password": ""
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/me"))
               .andExpectAll(
                       MockMvcResultMatchers.status().isOk(),
                       MockMvcResultMatchers.content().json(expected));
    }

    @Test
    void me_whenNotLoggedInThen401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/me"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user",password = "123")
    void logout_withRegisteredUserThen200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/logout"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}