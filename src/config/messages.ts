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
    loggedIn: 'Successfully Logged In',
    invalidEmail: 'Invalid Email',
    invalidPassword: 'Invalid Password',
  },
  success: {
    loggedIn: 'Successfully Logged In',
    registered: 'Successfully Registered',

    gotImages: 'Successfully Retrieved Images',
    gotImageInformation: 'Successfully Retrieved Image Information',
    addedImage: 'Successfully Added Image',
    renamedImage: 'Successfully Renamed Image',
    removedImage: 'Successfully Removed Image',
    removedImages: 'Successfully Removed Images',

    gotApplication: 'Successfully Retrieved Application',
    gotApplications: 'Successfully Retrieved Applications',
    addedApplication: 'Successfully Added Application',
    updatedApplication: 'Successfully Updated Application',
    removedApplication: 'Successfully Removed Application',
    removedApplications: 'Successfully Removed Applications',
  },
});

export default messages;
