package de.neuefische.backend.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void create_WhenLoggedInThenCreateUserSuccessfully() throws Exception {
        String given = """
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
                        .content(given))
                .andExpect(status().isOk())
                .andExpect(content().json(expected))
                .andExpect(jsonPath("$.id", notNullValue()));

    }

    @Test
    void create_WhenNotLoggedInThen401() throws Exception {
        String given = """
                {
                    "username": "user",
                    "password": "123"
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(given))
                .andExpect(status().isUnauthorized());

    }


    @Test
    void login() {
    }

    @Test
    void me() {
    }

    @Test
    void logout() {
    }
}