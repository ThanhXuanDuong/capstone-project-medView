package de.neuefische.backend.note;

import de.neuefische.backend.patient.PatientRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.mockito.Mockito.*;

class NoteServiceTest {

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

        NoteRepository noteRepository = mock(NoteRepository.class);
        when(noteRepository.findAllByImageId("imageId 1")).thenReturn(List.of(note1));

        PatientRepository patientRepository = mock(PatientRepository.class);

        //when
        NoteService noteService = new NoteService(noteRepository,patientRepository);
        List<Note> actual = noteService.getAllByImageId("imageId 1");

        //then
        Assertions.assertEquals(List.of(note1), actual);
        verify(noteRepository).findAllByImageId("imageId 1");
    }



}