package de.neuefische.backend.patient;

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
class PatientControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Test
    void add_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(post("/api/patients"))
                .andExpect(status().isUnauthorized());
    }


    @Test
    @WithMockUser(username = "user", password = "pw")
    void add_returnPatient_whenAddPatient() throws Exception {
        //given
        String requestBody = """
                {
                    "lastname":"Mustermann",
                    "firstname":"Max",
                    "gender":"MALE",
                    "birthday":"2000-10-20",
                    "address":"",
                    "telephone":"",
                    "imageIds":["1","2"]
                }
                """;

        String expected = """
                {
                    "lastname":"Mustermann",
                    "firstname":"Max",
                    "gender":"MALE",
                    "birthday":"2000-10-20",
                    "address":"",
                    "telephone":"",
                    "imageIds":["1","2"],
                    "createdBy": "user"
                }
                """;
        appUserRepository.save(new AppUser("1", "user", "pw"));

        //when and then
        mvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                        status().isOk(),
                        content().json(expected));
    }

    @Test
    void getAll_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(get("/api/patients"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void getAll_returnEmptyPatientList_whenLoggedInAndNoPatientExists() throws Exception {
        appUserRepository.save(new AppUser("1","user","pw"));

        mvc.perform(get("/api/patients"))
                .andExpectAll(
                        status().isOk(),
                        content().json("[]", true)
                );
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void getAll_returnAllPatients_whenLoggedIn() throws Exception {
        appUserRepository.save(new AppUser("1","user","pw"));

        patientRepository.save(new Patient(
                "1",
                "Miller",
                "Helen",
                Gender.FEMALE,
                "2000-10-20",
                "",
                "",
                List.of("1","2","3"),
                LocalDateTime.now(),
                "user"
        ));

        String expected = """
                   [{
                       "id":"1",
                       "lastname":"Miller",
                       "firstname":"Helen",
                       "gender":"FEMALE",
                       "birthday":"2000-10-20",
                       "address":"",
                       "telephone":"",
                       "imageIds":["1","2","3"],
                       "createdBy": "user"
                   }]
                   """;

        mvc.perform(get("/api/patients"))
                .andExpectAll(
                        status().isOk(),
                        content().json(expected)
                );
    }

    @Test
    void updateById_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(put("/api/patients/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void updateById_returnUpdatedPatient_whenLoggedIn () throws Exception {
        appUserRepository.save(new AppUser("1","user","pw"));

        patientRepository.save(new Patient(
                "1",
                "Miller",
                "Helen",
                Gender.FEMALE,
                "2000-10-20",
                "",
                "",
                List.of("1","2","3"),
                LocalDateTime.now(),
                "user"
        ));

        String requestBody = """
                   {
                       "lastname":"Miller",
                       "firstname":"Helen",
                       "gender":"FEMALE",
                       "birthday":"2000-10-20",
                       "address":"",
                       "telephone":"",
                       "imageIds":["1","2","3"]
                   }
                   """;

        String expected = """
                   {
                        "id": "1",
                       "lastname":"Miller",
                       "firstname":"Helen",
                       "gender":"FEMALE",
                       "birthday":"2000-10-20",
                       "address":"",
                       "telephone":"",
                       "imageIds":["1","2","3"],
                       "createdBy": "user"
                   }
                   """;

        mvc.perform(put("/api/patients/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                    status().isOk(),
                    content().json(expected));
    }

    @Test
    void deleteById_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(delete("/api/patients/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void deleteById_return200_whenLoggedInAndDeletePatient() throws Exception {
        appUserRepository.save(new AppUser("1","user","pw"));

        patientRepository.save(new Patient(
                "1",
                "Miller",
                "Helen",
                Gender.FEMALE,
                "2000-10-20",
                "",
                "",
                List.of("1","2","3"),
                LocalDateTime.now(),
                "user"
        ));

        mvc.perform(delete("/api/patients/1"))
                .andExpect(status().isOk());

        mvc.perform(get("/api/patients"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]",true));
    }
}