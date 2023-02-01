package de.neuefische.backend.note;

import de.neuefische.backend.exception.NotFoundException;
import de.neuefische.backend.exception.PatientNotRegisteredException;
import de.neuefische.backend.patient.Patient;
import de.neuefische.backend.patient.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    private final PatientRepository patientRepository;

    public Note add(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> getAllByImageId(String id) {
        return noteRepository.findAllByImageId(id);
    }

    public Map<String,List<Note>> getAllByPatientId(String id) throws PatientNotRegisteredException {
        Optional<Patient> patient = patientRepository.findById(id);
        Map<String,List<Note>> notes= new HashMap<>();

        if (patient.isPresent()){
            List<String> imageIds = patient.get().getImageIds();
            for (String imageId : imageIds){
                notes.put(imageId,this.getAllByImageId(imageId));
            }
            return notes;
        }else{
            throw new PatientNotRegisteredException();
        }
    }

    public Note updateById(String id, Note note) throws NotFoundException {
        note.setId(id);
        if (!noteRepository.existsById(id)){
            throw new NotFoundException();
        }
        return this.add(note);
    }

    public void deleteById(String id) throws NotFoundException {
        if (noteRepository.existsById(id)){
            noteRepository.deleteById(id);
        }else{
            throw new NotFoundException();
        }
    }
}
