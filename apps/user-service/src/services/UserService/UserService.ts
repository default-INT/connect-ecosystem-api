import { IdentityRepository, ProfileRepository, UserRepository } from '../../repositories';

export class UserService {
  protected identityRepository: IdentityRepository;
  protected userRepository: UserRepository;
  protected profileRepository: ProfileRepository;

  constructor(
    userRepository: UserRepository,
    profileRepository: ProfileRepository,
    identityRepository: IdentityRepository,
  ) {
    this.identityRepository = identityRepository;
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
  }
}
