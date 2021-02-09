interface Messages {
  errors: Record<string, [message: string, statusCode: number]>;
  flash: Record<string, string>;
  success: Record<string, string>;
}

// Helper to keep intellisense, and have strong typings.
const create = <T>() => <S extends T>(obj: S): S => obj;

const messages = create<Messages>()({
  errors: {
    userNotFound: ['User Not Found', 404],
    applicationNotFound: ['Application Not Found', 404],
    imageNotFound: ['Image Not Found', 404],

    noTokenProvided: ['No Token Provided', 400],
    noFileProvided: ['No File Provided', 400],
    noIdProvided: ['No Id Provided', 400],
    invalidToken: ['Invalid Token', 400],
    missingParameters: ['Missing Body Parameters', 400],

    userAlreadyExists: ['User Already Exists', 409],
    applicationAlreadyExists: ['Application Name Already Used', 409],

    serverError: ['Internal Server Error', 500],
  },
  flash: {
    loggedIn: 'Successfuly Logged In',
    invalidEmail: 'Invalid Email',
    invalidPassword: 'Invalid Password',
  },
  success: {
    loggedIn: 'Successfuly Logged In',
    registered: 'Successfuly Registered',

    gotImages: 'Successfuly Retrieved Images',
    addedImage: 'Successfuly Added Image',
    renamedImage: 'Successfuly Renamed Image',
    removedImage: 'Successfuly Removed Image',
    removedImages: 'Successfuly Removed Images',

    gotApplication: 'Successfuly Retrieved Application',
    gotApplications: 'Successfuly Retrieved Applications',
    addedApplication: 'Successfuly Added Application',
    updatedApplication: 'Successfuly Updated Application',
    removedApplication: 'Successfuly Removed Application',
    removedApplications: 'Successfuly Removed Applications',
  },
});

export default messages;
