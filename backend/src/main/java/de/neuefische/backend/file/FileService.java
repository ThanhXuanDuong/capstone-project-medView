package de.neuefische.backend.file;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.client.gridfs.model.GridFSFile;
import de.neuefische.backend.exception.PatientNotRegisteredException;
import de.neuefische.backend.note.NoteRepository;
import de.neuefische.backend.patient.Patient;
import de.neuefische.backend.patient.PatientRepository;
import de.neuefische.backend.user.AppUser;
import de.neuefische.backend.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileService {
    private final GridFsTemplate gridFsTemplate;
    private final AppUserService appUserService;
    private final PatientRepository patientRepository;
    private final NoteRepository noteRepository;

    public String saveFile(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "File is empty"
            );
        }

        AppUser appUser =  appUserService.getAuthenticatedUser();

        ObjectId objectId = gridFsTemplate.store(
                multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(),
                multipartFile.getContentType(),
                BasicDBObjectBuilder.start()
                        .add("createdBy", appUser.getUsername())
                        .get()
        );
        return objectId.toString();
    }

    public List<String> saveFiles(MultipartFile[] files) throws IOException {
        List<String> objectIds = new ArrayList<>();

        for (MultipartFile file :files ){
            String objectId = this.saveFile(file);
            objectIds.add(objectId);
        }
        return objectIds;
    }

    public GridFsResource getResource(String id) {
       return gridFsTemplate.getResource(getFile(id));
    }

    public GridFSFile getFile(String id) {
        return Optional.ofNullable(
                gridFsTemplate.findOne(
                        Query.query(Criteria.where("_id").is(id))
                )
        ).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "File not found"
                )
        );
    }

    public void deleteById(String fileId){
        noteRepository.deleteAllByImageId(fileId);
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(fileId)));
        // patient data must be updated by put request
    }

    public void deleteAllByPatientId(String patientId)
            throws PatientNotRegisteredException {
        Optional<Patient> patient = patientRepository.findById(patientId);

        if(patient.isPresent()) {
            List<String> imageIds = patient.get().getImageIds();

            for (String imagId : imageIds) {
                gridFsTemplate.delete(new Query(Criteria.where("_id").is(imagId)));
            }
        }else{
            throw new PatientNotRegisteredException();
        }
    }

}