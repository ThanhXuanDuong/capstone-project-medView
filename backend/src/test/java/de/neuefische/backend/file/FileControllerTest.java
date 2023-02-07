package de.neuefische.backend.file;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class FileControllerTest {

    @Autowired
    private MockMvc mvc;

    private void saveTestUser() throws Exception {
        String requestBody = """
                {
                    "username": "user",
                    "password": "pw"
                }
                """;
        String response = """
                {
                    "username": "user",
                    "password": ""
                }
                """;
        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content().json(response));
    }

    @Test
    void uploadFile_whenNotLoggedIn_then401() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/files"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user",password = "pw")
    void upload_whenEmptyFile_thenReturn_BAD_REQUEST() throws Exception {
        // given
        saveTestUser();

        MockMultipartFile mockMultipartFile1 = new MockMultipartFile(
                        "files",
                        "filename1",
                        "multipart/form-data",
                        new byte[0]);

        MockMultipartFile mockMultipartFile2 = new MockMultipartFile(
                        "files",
                        "filename2",
                        "multipart/form-data",
                        new byte[0]);

        //when and then
        mvc.perform(MockMvcRequestBuilders.multipart("/api/files")
                        .file(mockMultipartFile1)
                        .file(mockMultipartFile2))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "user",password = "pw")
    void upload_whenFileNotEmpty_thenReturn200() throws Exception {
        // given
        saveTestUser();

        MockMultipartFile mockMultipartFile1 = new MockMultipartFile(
                "files",
                "filename1",
                "multipart/form-data",
                "file".getBytes());

        MockMultipartFile mockMultipartFile2 = new MockMultipartFile(
                "files",
                "filename2",
                "multipart/form-data",
                "file".getBytes());

        //when and then
        mvc.perform(MockMvcRequestBuilders.multipart("/api/files")
                        .file(mockMultipartFile1)
                        .file(mockMultipartFile2))
                .andExpect(status().isOk());
    }

    @Test
    void getFile_whenNotLoggedIn_then401() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/files/1"))
                .andExpect(status().isUnauthorized());
    }

  }