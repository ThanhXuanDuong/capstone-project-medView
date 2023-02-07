package de.neuefische.backend.note;

import de.neuefische.backend.exception.NotFoundException;
import de.neuefische.backend.exception.PatientNotRegisteredException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @PostMapping
    public Note add(@Valid @RequestBody Note note){
        return noteService.add(note);
    }

    @GetMapping("/image/{id}")
    public List<Note> getAllByImageId(@PathVariable String id){
        return noteService.getAllByImageId(id);
    }

    @GetMapping("/patient/{id}")
    public Map<String,List<Note>> getAllByPatientId(@PathVariable String id)
            throws PatientNotRegisteredException {
        return noteService.getAllByPatientId(id);
    }

    @PutMapping("/{id}")
    public Note updateById(@PathVariable String id, @Valid @RequestBody Note note)
            throws NotFoundException {
        return noteService.updateById(id,note);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) throws NotFoundException {
        noteService.deleteById(id);
    }

}
