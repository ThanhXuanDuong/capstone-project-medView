package de.neuefische.backend.file;

import de.neuefische.backend.note.NoteRepository;
import de.neuefische.backend.patient.PatientRepository;
import de.neuefische.backend.user.AppUserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

class FileServiceTest {

    private final GridFsTemplate gridFsTemplate = mock(GridFsTemplate.class);

    private final AppUserService appUserService = mock(AppUserService.class);

    private final PatientRepository patientRepository = mock(PatientRepository.class);

    private final NoteRepository noteRepository = mock(NoteRepository.class);

    private final FileService fileService = new FileService(
            gridFsTemplate, appUserService, patientRepository, noteRepository);


    @Test
    void saveFile_whenEmptyFile_thenThrowException() throws IOException {
        //given
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "files",
                "filename",
                "multipart/form-data",
                new byte[0]);

        // when & then
        try {
            fileService.saveFile( mockMultipartFile);
            Assertions.fail();
        } catch (ResponseStatusException e) {
            Assertions.assertEquals(HttpStatus.BAD_REQUEST, e.getStatus());
        }

        assertTrue(mockMultipartFile.isEmpty());
    }
}