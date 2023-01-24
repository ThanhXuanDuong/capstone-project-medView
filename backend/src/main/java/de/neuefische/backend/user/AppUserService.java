package de.neuefische.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserService {
   private final AppUserRepo appUserRepo;
}
