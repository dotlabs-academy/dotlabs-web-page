interface ValidateFieldOptions {
  value: string;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isLegalID?: boolean;
}

export interface FormValues {
  name: string;
  legalID: string;
  email: string;
  eps: string;
}

export const validateField = ({
  value,
  minLength = 5,
  maxLength = 30,
  isEmail = false,
  isLegalID = false,
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
    if (isEmail) {
      const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!re.test(value)) {
        return "Invalid email address";
      }
    }

    if (isLegalID) {
      if (parseInt(value) < 10000000) {
        return "Invalid legal ID";
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
    isLegalID: true,
  });
  errors.email = validateField({
    value: values.email,
    minLength: 10,
    isEmail: true,
  });
  errors.eps = validateField({ value: values.eps, minLength: 3 });

  if (Object.values(errors).every((error) => error === undefined)) {
    errors = {};
  }

  return errors;
};

// ! type
export const resetForm = (formik: any, defaultValues: FormValues) => {
  formik.setValues(defaultValues);
  formik.setTouched({
    name: false,
    legalID: false,
    email: false,
    eps: false,
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
