export enum inputTypes {
  email = "email",
  legalId = "legalId",
  url = "url",
}

interface ValidateFieldOptions {
  value: string;
  minLength?: number;
  maxLength?: number;
  inputType?: inputTypes | undefined;
}

export interface FormValues {
  name: string;
  email: string;
  legalID: string;
  eps: string;
  phone: string;
  gitHubProfile: string;
}

export interface UserDto {
  name: string;
  email: string;
  legalID: string;
  eps: string;
  phone: string;
  gitHubProfile: string;
  address: `0x${string}` | undefined;
}

export const validateField = ({
  value,
  minLength = 5,
  maxLength = 30,
  inputType,
}: ValidateFieldOptions) => {
  if (!value) {
    return "Required";
  } else if (value === "") {
    return;
  } else if (value.length < minLength) {
    return `Must be ${minLength} characters or more`;
  } else if (value.length > maxLength) {
    return `Must be ${maxLength} characters or less`;
  } else {
    if (inputType == inputTypes.email) {
      const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!re.test(value)) {
        return "Invalid email address";
      }
    }

    if (inputType == inputTypes.legalId) {
      if (parseInt(value) < 10000000) {
        return "Invalid legal ID";
      }
    }

    if (inputType == inputTypes.url) {
      if (!value.startsWith("https://")) {
        return "Invalid URL";
      }
    }
  }
};

export const validate = (values: FormValues) => {
  let errors: any = {};

  errors.name = validateField({ value: values.name, minLength: 6 });
  errors.legalID = validateField({
    value: values.legalID,
    minLength: 10,
    inputType: inputTypes.legalId,
  });
  errors.email = validateField({
    value: values.email,
    minLength: 10,
    inputType: inputTypes.email,
  });
  errors.eps = validateField({ value: values.eps, minLength: 3 });
  errors.gitHubProfile = validateField({
    value: values.gitHubProfile,
    minLength: 10,
    maxLength: 100,
    inputType: inputTypes.url,
  });
  errors.phone = validateField({
    value: values.phone,
    minLength: 10,
  });

  if (Object.values(errors).every((error) => error === undefined)) {
    errors = {};
  }

  return errors;
};

export const resetForm = (formik: any, defaultValues: FormValues) => {
  formik.setValues(defaultValues);
  formik.setTouched({
    name: false,
    legalID: false,
    email: false,
    eps: false,
    phone: false,
    gitHubProfile: false,
  });
};

export const checkStateAndSetClass = (
  touched: boolean | undefined,
  error: string | undefined,
  baseClass: string,
  classIfError: string = "border-red-500 focus:ring-red-500"
) => {
  if (touched && error) {
    return `${baseClass} ${classIfError}`;
  }

  return baseClass;
};
