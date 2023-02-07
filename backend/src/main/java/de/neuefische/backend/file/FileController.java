package de.neuefische.backend.file;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping
    public List<String> uploadFile(@RequestParam("files") MultipartFile[]  files
    ) throws IOException {
        return fileService.saveFiles(files);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InputStreamResource> getFile (@PathVariable String id)
            throws IOException {
        GridFsResource gridFsResource = fileService.getResource(id);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(gridFsResource.getContentType()))
                .body(new InputStreamResource(gridFsResource.getInputStream()));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id) {
        fileService.deleteById(id);
    }
}