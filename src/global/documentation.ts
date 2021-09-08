import { HttpStatus } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';
import { ApplicationResponseDto } from '../applications/dto/application-response.dto';
import { CreateApplicationResponseDto } from '../applications/dto/create-application-response.dto';
import { AuthUserResponseDto } from '../auth/dto/auth-user-response.dto';
import { ContentResponseDto } from '../contents/dto/content-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

const AUTHENTICATION_SUCCESS_DATA_SENT = 'Returns OK if the authentication succeeded and the data is sent';
const NO_AUTHORIZATION_HEADER = 'Returns BAD_REQUEST if no "Authorization" header is provided';
const NO_DATA_FOUND = 'Returns NOT_FOUND if no data with the provided id is found';

export const DOCUMENTATION = {
  APPLICATIONS: {
    CREATE: {
      [HttpStatus.CREATED]: {
        type: CreateApplicationResponseDto,
        description: 'Returns CREATED if the creation succeeded and the data is sent',
      },
      [HttpStatus.BAD_REQUEST]: { description: NO_AUTHORIZATION_HEADER },
    },
    FIND_ALL: {
      [HttpStatus.OK]: {
        type: ApplicationResponseDto,
        isArray: true,
        description: AUTHENTICATION_SUCCESS_DATA_SENT,
      },
      [HttpStatus.BAD_REQUEST]: { description: NO_AUTHORIZATION_HEADER },
    },
    FIND_ONE: {
      [HttpStatus.OK]: {
        type: ApplicationResponseDto,
        description: AUTHENTICATION_SUCCESS_DATA_SENT,
      },
      [HttpStatus.BAD_REQUEST]: { description: NO_AUTHORIZATION_HEADER },
    },
    UPDATE: {
      [HttpStatus.OK]: {
        type: ApplicationResponseDto,
        description: AUTHENTICATION_SUCCESS_DATA_SENT,
      },
      [HttpStatus.BAD_REQUEST]: { description: NO_AUTHORIZATION_HEADER },
      [HttpStatus.NOT_FOUND]: { description: NO_DATA_FOUND },
    },
    REMOVE_ONE: {
      [HttpStatus.OK]: { description: AUTHENTICATION_SUCCESS_DATA_SENT },
      [HttpStatus.BAD_REQUEST]: { description: NO_AUTHORIZATION_HEADER },
      [HttpStatus.NOT_FOUND]: { description: NO_DATA_FOUND },
    },
  },

  AUTH: {
    LOGIN: {
      [HttpStatus.OK]: {
        type: OmitType(AuthUserResponseDto, ['token']),
        description: 'Returns OK if you are logged in',
      },
      [HttpStatus.BAD_REQUEST]: { description: 'Returns BAD_REQUEST if username or password is invalid' },
    },
    REGISTER: {
      [HttpStatus.CREATED]: {
        type: AuthUserResponseDto,
        description: 'Returns CREATED if your account has been created',
      },
      [HttpStatus.BAD_REQUEST]: { description: 'Returns BAD_REQUEST if the username or email is already taken' },
    },
  },

  CONTENT: {
    FIND_ONE: {
      [HttpStatus.OK]: { description: AUTHENTICATION_SUCCESS_DATA_SENT },
      [HttpStatus.NOT_FOUND]: { description: NO_DATA_FOUND },
    },
  },

  CONTENTS: {
    CREATE: {
      [HttpStatus.CREATED]: {
        type: ContentResponseDto,
        description: 'Returns CREATED if the creation succeeded and the data is sent',
      },
      [HttpStatus.BAD_REQUEST]: { description: 'Returns BAD_REQUEST if no "Authorization" header is provided, or if no file is provided, or if the file type is invalid' },
      [HttpStatus.UNAUTHORIZED]: { description: 'Returns UNAUTHORIZED if the provided "Authorization" header is invalid' },
      [HttpStatus.PAYLOAD_TOO_LARGE]: { description: "Returns PAYLOAD_TOO_LARGE if the provided file's size exceeds the maximum limit" },
    },
    FIND_ALL: {
      [HttpStatus.OK]: {
        type: ContentResponseDto,
        isArray: true,
        description: AUTHENTICATION_SUCCESS_DATA_SENT,
      },
      [HttpStatus.BAD_REQUEST]: { description: NO_AUTHORIZATION_HEADER },
    },
    FIND_ONE: {
      [HttpStatus.OK]: { description: AUTHENTICATION_SUCCESS_DATA_SENT },
      [HttpStatus.NOT_FOUND]: { description: NO_DATA_FOUND },
    },
    FIND_INFORMATION: {
      [HttpStatus.OK]: {
        type: ContentResponseDto,
        description: AUTHENTICATION_SUCCESS_DATA_SENT,
      },
      [HttpStatus.NOT_FOUND]: { description: NO_DATA_FOUND },
    },
    REMOVE_ONE: {
      [HttpStatus.OK]: { description: AUTHENTICATION_SUCCESS_DATA_SENT },
      [HttpStatus.NOT_FOUND]: { description: NO_DATA_FOUND },
    },
  },

  USERS: {
    FIND_ONE: {
      [HttpStatus.OK]: {
        type: UserResponseDto,
        description: AUTHENTICATION_SUCCESS_DATA_SENT,
      },
      [HttpStatus.BAD_REQUEST]: { description: 'Returns BAD_REQUEST if the provided "Authorization" header is invalid' },
    },
    REMOVE_ONE: {
      [HttpStatus.OK]: { description: AUTHENTICATION_SUCCESS_DATA_SENT },
      [HttpStatus.NOT_FOUND]: { description: NO_DATA_FOUND },
      [HttpStatus.PRECONDITION_FAILED]: { description: 'Returns PRECONDITION_FAILED if the user still owns applications.' },
    },
  },
};
