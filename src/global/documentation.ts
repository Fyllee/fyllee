import { HttpStatus } from '@nestjs/common';

const AUTHENTICATION_SUCCESS_DATA_SENT = 'Returns OK if the authentication succeeded and the data is sent';
const NO_AUTHORIZATION_HEADER = 'Returns BAD_REQUEST if no "Authorization" header is provided';
const NO_DATA_FOUND = 'Returns NOT_FOUND if no data with the provided id is found';

export const DOCUMENTATION = {
  APPLICATIONS: {
    CREATE: {
      [HttpStatus.CREATED]: 'Returns CREATED if the creation succeeded and the data is sent',
      [HttpStatus.BAD_REQUEST]: NO_AUTHORIZATION_HEADER,
    },
    FIND_ALL: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.BAD_REQUEST]: NO_AUTHORIZATION_HEADER,
    },
    FIND_ONE: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.BAD_REQUEST]: NO_AUTHORIZATION_HEADER,
    },
    UPDATE: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.BAD_REQUEST]: NO_AUTHORIZATION_HEADER,
      [HttpStatus.NOT_FOUND]: NO_DATA_FOUND,
    },
    REMOVE_ONE: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.BAD_REQUEST]: NO_AUTHORIZATION_HEADER,
      [HttpStatus.NOT_FOUND]: NO_DATA_FOUND,
    },
  },

  AUTH: {
    LOGIN: {
      [HttpStatus.OK]: 'Returns OK if you are logged in',
      [HttpStatus.BAD_REQUEST]: 'Returns BAD_REQUEST if username or password is invalid',
    },
    REGISTER: {
      [HttpStatus.CREATED]: 'Returns CREATED if your account has been created',
      [HttpStatus.BAD_REQUEST]: 'Returns BAD_REQUEST if the username or email is already taken',
    },
  },

  CONTENT: {
    FIND_ONE: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.NOT_FOUND]: NO_DATA_FOUND,
    },
  },

  CONTENTS: {
    CREATE: {
      [HttpStatus.CREATED]: 'Returns CREATED if the creation succeeded and the data is sent',
      [HttpStatus.BAD_REQUEST]: 'Returns BAD_REQUEST if no "Authorization" header is provided, or if no file is provided, or if the file type is invalid',
      [HttpStatus.UNAUTHORIZED]: 'Returns UNAUTHORIZED if the provided "Authorization" header is invalid',
      [HttpStatus.PAYLOAD_TOO_LARGE]: "Returns PAYLOAD_TOO_LARGE if the provided file's size exceeds the maximum limit",
    },
    FIND_ALL: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.BAD_REQUEST]: NO_AUTHORIZATION_HEADER,
    },
    FIND_ONE: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.NOT_FOUND]: NO_DATA_FOUND,
    },
    FIND_INFORMATION: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.NOT_FOUND]: NO_DATA_FOUND,
    },
    REMOVE_ONE: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.NOT_FOUND]: NO_DATA_FOUND,
    },
  },

  USERS: {
    FIND_ONE: {
      [HttpStatus.OK]: AUTHENTICATION_SUCCESS_DATA_SENT,
      [HttpStatus.BAD_REQUEST]: 'Returns BAD_REQUEST if the provided "Authorization" header is invalid',
    },
  },
};
