package de.neuefische.backend.note;

import de.neuefische.backend.user.AppUser;
import de.neuefische.backend.user.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class NoteControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private AppUserRepository appUserRepository;

    @Test
    void add_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(post("/api/notes"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void add_returnPatient_whenLoggedInAndAddPatient () throws Exception {
        appUserRepository.save(new AppUser("1", "user", "pw"));

        String requestBody = """
                {
                    "imageId":"1",
                    "text":"note 1"
                }
                """;
        String expected = """
                {
                    "imageId":"1",
                    "text":"note 1"
                }
                """;

        //when and then
        mvc.perform(post("/api/notes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                        status().isOk(),
                        content().json(expected));
    }

    @Test
    void getAllByImageId_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(get("/api/notes/image/1"))
                .andExpect(status().isUnauthorized());
    }


}