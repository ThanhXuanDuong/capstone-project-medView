package de.neuefische.backend.note;

import de.neuefische.backend.patient.Gender;
import de.neuefische.backend.patient.Patient;
import de.neuefische.backend.patient.PatientRepository;
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

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    private PatientRepository patientRepository;

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
                    "id": "1",
                    "imageId":"1",
                    "text":"note 1"
                }
                """;
        String expected = """
                {
                    "id": "1",
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
                        content().json(expected,true));
    }

    @Test
    void getAllByImageId_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(get("/api/notes/image/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void getAllByImageId_returnEmptyList_whenLoggedInAndNoNoteExists () throws Exception {
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
                        content().json(expected,true));
    }

    @Test
    void getAllByPatientId_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(get("/api/notes/patient/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void getAllByPatientId_returnEmptyList_whenLoggedInAndNoNoteExists () throws Exception {
        appUserRepository.save(new AppUser("1", "user", "pw"));

        patientRepository.save(new Patient(
                "1",
                "Miller",
                "Helen",
                Gender.FEMALE,
                "2000-10-20",
                "",
                "",
                List.of(),
                LocalDateTime.now(),
                "user"
        ));

        mvc.perform(get("/api/notes/patient/1"))
                .andExpectAll(
                        status().isOk(),
                        content().json("{}", true)
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void getAllByPatientId_returnAllNotesOfAPatient_whenLoggedIn () throws Exception {
        appUserRepository.save(new AppUser("1", "user", "pw"));

        patientRepository.save(new Patient(
                "1",
                "Miller",
                "Helen",
                Gender.FEMALE,
                "2000-10-20",
                "",
                "",
                List.of("imageId1", "imageId2"),
                LocalDateTime.now(),
                "user"
        ));

        noteRepository.save(new Note("1","imageId1","note1"));
        noteRepository.save(new Note("2","imageId1","note2"));
        noteRepository.save(new Note("3","imageId3","note3"));

        String expected = """
                {
                    "imageId1": [
                         {
                             "id": "1",
                             "imageId": "imageId1",
                             "text": "note1"
                         },
                         {
                             "id": "2",
                             "imageId": "imageId1",
                             "text": "note2"
                         }
                     ],
                    "imageId2": []
                }
                """;

        mvc.perform(get("/api/notes/patient/1"))
                .andExpectAll(
                        status().isOk(),
                        content().json(expected,true)
                );
    }

    @Test
    void updateById_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(put("/api/notes/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void updateById_returnUpdatedNote_whenLoggedIn() throws Exception {
        appUserRepository.save(new AppUser("1", "user", "pw"));

        String note = """
                {
                    "id": "1",
                    "imageId":"1",
                    "text":"note 1"
                }
                """;
        String updated = """
                {
                    "id": "1",
                    "imageId":"1",
                    "text":"modified note"
                }
                """;
        String expected = """
                {
                    "id": "1",
                    "imageId":"1",
                    "text":"modified note"
                }
                """;

        //when and then
        mvc.perform(post("/api/notes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(note))
                .andExpectAll(
                        status().isOk(),
                        content().json(note,true));

        mvc.perform(put("/api/notes/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(updated))
                .andExpectAll(
                        status().isOk(),
                        content().json(expected, true)
                );
    }

    @Test
    void deleteById_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(delete("/api/notes/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void deleteById_return200_whenLoggedInAndDeleteNote() throws Exception {
        appUserRepository.save(new AppUser("1","user","pw"));

        noteRepository.save(new Note("1","imageId1","note1"));

        mvc.perform(delete("/api/notes/1"))
                .andExpect(status().isOk());

        mvc.perform(get("/api/notes/image/imageId1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]",true));
    }
}