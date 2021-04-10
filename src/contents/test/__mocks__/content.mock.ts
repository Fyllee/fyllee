import { mockedApplication } from '../../../applications/test/__mocks__/application.mock';
import { Content } from '../../content.entity';

export const mockedContent = new Content(mockedApplication, 'forest.jpg', 521_567);
