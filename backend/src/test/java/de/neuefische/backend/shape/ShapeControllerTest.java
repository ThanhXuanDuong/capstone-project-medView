package de.neuefische.backend.shape;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ShapeControllerTest {

    @Autowired
    private MockMvc mvc;

    private final String  appUserRequestBody= """
            {
                "id": "1",
                "username": "user",
                "password": "pw"
            }
            """;

    private final String appUserResponse= """
            {
                "id": "1",
                "username": "user",
                "password": ""
            }
            """;

    @Test
    void add_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(post("/api/shapes"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void add_returnShape_whenLoggedInAndAddShape () throws Exception {
        mvc.perform(post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRequestBody))
                .andExpectAll(
                        status().isOk(),
                        content().json(appUserResponse,true));

        String requestBody = """
                {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String expected = """
                {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;

        //when and then
        mvc.perform(post("/api/shapes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                        status().isOk(),
                        content().json(expected,true));
    }

    @Test
    void getAllByImageId_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(get("/api/shapes/image/testImageId"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void getAllByImageId_returnAllShapesOfAnImage_whenLoggedIn () throws Exception {
        mvc.perform(post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRequestBody))
                .andExpectAll(
                        status().isOk(),
                        content().json(appUserResponse,true));

        String shape1 = """
                {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String response1 = """
                {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String shape2 = """
                {
                    "id":"2",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String response2 = """
                {
                    "id":"2",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String shape3 = """
                {
                    "id":"3",
                    "type":"square",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId2"
                 }
                """;
        String response3 = """
                {
                    "id":"3",
                    "type":"square",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId2"
                 }
                """;
        mvc.perform(post("/api/shapes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(shape1))
                .andExpectAll(
                        status().isOk(),
                        content().json(response1,true));

        mvc.perform(post("/api/shapes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(shape2))
                .andExpectAll(
                        status().isOk(),
                        content().json(response2,true));

        mvc.perform(post("/api/shapes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(shape3))
                .andExpectAll(
                        status().isOk(),
                        content().json(response3,true));

        String expected= """
                [
                    {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                    },
                    {
                        "id":"2",
                        "type":"circle",
                        "point1":[0.5,0.5],
                        "point2":[0.55,0.55],
                        "imageId":"imageId1"
                     }
                ]
                
                """;

        mvc.perform(get("/api/shapes/image/imageId1"))
                .andExpectAll(
                        status().isOk(),
                        content().json(expected,true));
    }

    @Test
    void deleteById_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(delete("/api/shapes/testId"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void deleteById_deleteShapeById_whenLoggedIn () throws Exception {
        mvc.perform(post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRequestBody))
                .andExpectAll(
                        status().isOk(),
                        content().json(appUserResponse,true));

        String shape1 = """
                {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String response1 = """
                {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        mvc.perform(post("/api/shapes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(shape1))
                .andExpectAll(
                        status().isOk(),
                        content().json(response1,true));

        mvc.perform(delete("/api/shapes/1"))
                .andExpect(status().isOk());

        mvc.perform(get("/api/shapes/image/imageId1"))
                .andExpectAll(
                        status().isOk(),
                        content().json("[]",true));
    }

    @Test
    void deleteAllByImageId_return401_whenNotLoggedIn () throws Exception {
        mvc.perform(delete("/api/shapes/image/testImageId"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pw")
    void deleteAllByImageId_deleteAllShapesOfAnImage_whenLoggedIn () throws Exception {
        mvc.perform(post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRequestBody))
                .andExpectAll(
                        status().isOk(),
                        content().json(appUserResponse,true));

        String shape1 = """
                {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String response1 = """
                {
                    "id":"1",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String shape2 = """
                {
                    "id":"2",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        String response2 = """
                {
                    "id":"2",
                    "type":"circle",
                    "point1":[0.5,0.5],
                    "point2":[0.55,0.55],
                    "imageId":"imageId1"
                 }
                """;
        mvc.perform(post("/api/shapes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(shape1))
                .andExpectAll(
                        status().isOk(),
                        content().json(response1,true));

        mvc.perform(post("/api/shapes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(shape2))
                .andExpectAll(
                        status().isOk(),
                        content().json(response2,true));

        mvc.perform(delete("/api/shapes/image/imageId1"))
                .andExpect(status().isOk());

        mvc.perform(get("/api/shapes/image/imageId1"))
                .andExpectAll(
                        status().isOk(),
                        content().json("[]",true));
    }
}