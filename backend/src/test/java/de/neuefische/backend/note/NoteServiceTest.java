package de.neuefische.backend.note;

import de.neuefische.backend.exception.NotFoundException;
import de.neuefische.backend.exception.PatientNotRegisteredException;
import de.neuefische.backend.patient.Gender;
import de.neuefische.backend.patient.Patient;
import de.neuefische.backend.patient.PatientRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;

class NoteServiceTest {
    private Patient createOnePatient(){
        return  new Patient(
                 "patientId",
                "Mustermann",
                "Max",
                Gender.MALE,
                "2000-10-20",
                "test address",
                "test email",
                List.of("testImageId"),
                LocalDateTime.of(2023, 1, 1, 0, 0),
                "user1"
        );
    }

    @Test
    void add_addNoteToRepoAndReturnAddedNote() {
        //given
        Note note = new Note("testId","testImageId","testText");
        NoteRepository noteRepository = mock(NoteRepository.class);
        when(noteRepository.save(note)).thenReturn(note);

        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);
        Note actual = noteService.add(note);

        //then
        Assertions.assertEquals(note, actual);
        verify(noteRepository).save(note);
    }

    @Test
    void getAllByImageId_getAllNotesOfAnImage() {
        //given
        Note note1 = new Note("testId 1","imageId 1","testText");
        Note note2 = new Note("testId 2","imageId 1","testText2");

        NoteRepository noteRepository = mock(NoteRepository.class);
        when(noteRepository.findAllByImageId("imageId 1")).thenReturn(List.of(note1,note2));

        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);
        List<Note> actual = noteService.getAllByImageId("imageId 1");

        //then
        Assertions.assertEquals(List.of(note1,note2), actual);
        verify(noteRepository).findAllByImageId("imageId 1");
    }

    @Test
    void getAllByPatientId_throwException_whenPatientNotRegistered() {
        //given
        NoteRepository noteRepository = mock(NoteRepository.class);
        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);

        //then
        Assertions.assertThrows(PatientNotRegisteredException.class,
                () -> noteService.getAllByPatientId("patientId not exist"));
    }

    @Test
    void getAllByPatientId_getAllNotesOfAPatient() throws PatientNotRegisteredException {
        //given
        Note note1 = new Note("testId 1","testImageId","testText1");
        Note note2 = new Note("testId 2","testImageId","testText2");

        NoteRepository noteRepository = mock(NoteRepository.class);
        when(noteRepository.findAllByImageId("testImageId")).thenReturn(List.of(note1, note2));

        PatientRepository patientRepository = mock(PatientRepository.class);
        when(patientRepository.findById("patientId"))
                .thenReturn(Optional.of(createOnePatient()));

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);
        Map<String,List<Note>> actual = noteService.getAllByPatientId("patientId");

        //then
        Assertions.assertEquals(Map.of("testImageId" ,List.of(note1,note2)), actual);
        verify(noteRepository).findAllByImageId("testImageId");
        verify(patientRepository).findById("patientId");
    }

    @Test
    void updateById_throwException_whenNoteDoesNotExist() {
        //given
        NoteRepository noteRepository = mock(NoteRepository.class);
        when(noteRepository.existsById("testId")).thenReturn(false);

        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);

        //then
        Assertions.assertThrows(NotFoundException.class,
                () -> noteService.updateById("not existing id",new Note()));
    }

    @Test
    void updateById_updateNote_whenNoteExists() throws NotFoundException {
        //given
        Note note = new Note("testId","testImageId","testText");

        NoteRepository noteRepository = mock(NoteRepository.class);
        when(noteRepository.existsById("testId")).thenReturn(true);
        when(noteRepository.save(note)).thenReturn(note);

        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);
        Note actual = noteService.updateById("testId",note);

        //then
        Assertions.assertEquals(note, actual);
        verify(noteRepository).existsById("testId");
        verify(noteRepository).save(note);
    }

    @Test
    void deleteById_throwException_whenNoteDoesNotExist() {
        //given
        NoteRepository noteRepository = mock(NoteRepository.class);
        when(noteRepository.existsById("testId")).thenReturn(false);

        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);

        //then
        Assertions.assertThrows(NotFoundException.class,
                () -> noteService.deleteById("not existing id"));
    }

    @Test
    void deleteById_deleteNote_whenNoteExists() throws NotFoundException {
        //given
        NoteRepository noteRepository = mock(NoteRepository.class);
        when(noteRepository.existsById("testId")).thenReturn(true);

        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);
        noteService.deleteById("testId");
        //then
        verify(noteRepository).deleteById("testId");
    }

    @Test
    void deleteAllByPatientId_throwException_whenPatientNotRegistered() {
        //given
        NoteRepository noteRepository = mock(NoteRepository.class);
        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);

        //then
        Assertions.assertThrows(PatientNotRegisteredException.class,
                () -> noteService.deleteAllByPatientId("not existing id"));
    }
}