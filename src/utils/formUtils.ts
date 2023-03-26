import * as Yup from "yup";
import { RegistrationContract } from "./RegistrationManager";
import { ethers } from "ethers";

export const FormSchema = Yup.object().shape({
	name: Yup.string()
		.required("Required")
		.min(7, "Name is too short - should be 7 chars minimum."),
	legalID: Yup.string()
		.required("Required")
		.min(7, "ID is too short - should be 7 chars minimum."),
	email: Yup.string().email("Invalid email").required("Required"),
	eps: Yup.string().required("Required"),
	gitHubProfile: Yup.string().required("Required"),
	phone: Yup.string()
		.required()
		.min(8, "Phone is too short - Should be 8 chars minimum."),
});

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
		if (inputType === inputTypes.email) {
			const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
			if (!re.test(value)) {
				return "Invalid email address";
			}
		}

		if (inputType === inputTypes.legalId) {
			if (parseInt(value) < 10000000) {
				return "Invalid legal ID";
			}
		}

		if (inputType === inputTypes.url) {
			if (!value.startsWith("https://")) {
				return "Invalid URL";
			}
		}
	}
};

export const validate = (values: FormValues) => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
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

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
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
	classIfError: string = "border-red-500 focus:ring-red-500",
) => {
	if (touched && error) {
		return `${baseClass} ${classIfError}`;
	}

	return baseClass;
};

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const saveUserToDB = async (userObj: UserDto): Promise<any> => {
	let ok: boolean = false;
	const apiRes = await fetch("/api/user", {
		method: "POST",
		body: JSON.stringify(userObj),
	})
		.then((data) => data.json())
		.catch((err) => {
			console.error(err);
			ok = false;
		});

	ok = apiRes.user;

	return ok;
};

export const saveUserToContract = async ({
	contract,
	data,
}: {
	contract: RegistrationContract;
	data: ethers.Signer | undefined;
}): Promise<boolean> => {
	if (contract && data) {
		const res = await contract.joinIn(data);
		console.log({ res });
		if (res) return true;
	}

	return false;
};
