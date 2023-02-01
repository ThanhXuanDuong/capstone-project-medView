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

    @Autowired
    private NoteRepository noteRepository;

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

    @Test
    @WithMockUser(username = "user", password = "pw")
    void getAllByImageId_returnEmptyList_whenLoggedInAndNoNoteExits () throws Exception {
        appUserRepository.save(new AppUser("1", "user", "pw"));

        mvc.perform(get("/api/notes/image/imageId"))
                .andExpectAll(
                        status().isOk(),
                        content().json("[]", true)
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void getAllByImageId_returnAllNotesOfAnImage_whenLoggedIn () throws Exception {
        appUserRepository.save(new AppUser("1", "user", "pw"));

        noteRepository.save(new Note("id1", "imageId", "note1"));
        noteRepository.save(new Note("id2", "imageId", "note2"));

        String expected = """
                [
                    {
                    "id": "id1",
                    "imageId":"imageId",
                    "text":"note1"
                    },
                    {
                    "id": "id2",
                    "imageId":"imageId",
                    "text":"note2"
                    }
                ]
                """;
        mvc.perform(get("/api/notes/image/imageId"))
                .andExpectAll(
                        status().isOk(),
                        content().json(expected));
    }
}