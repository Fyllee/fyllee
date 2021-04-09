import { mockedUser } from '../../../auth/test/__mocks__/user.mock';
import { Application } from '../../application.entity';

export const mockedApplication = new Application(mockedUser, 'app-name', 'test.com', "This is the app's description!");
