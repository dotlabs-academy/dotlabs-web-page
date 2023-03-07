interface ValidateFieldOptions {
  value: string;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isLegalID?: boolean;
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
