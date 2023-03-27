import { useState, useContext } from "react";
import { useFormik } from "formik";
import { BiLoaderAlt } from "react-icons/bi";

import { LabelStd } from "../common/LabelStd";
import { InputErrorStd } from "../common/InputErrorStd";
import {
  FormValues,
  UserDto,
  FormSchema,
  saveUserToDB,
} from "../../utils/formUtils";
import {
  ContractContext,
  IContractContext,
} from "../../hooks/RegistrationManagerContractContext";
import { checkStateAndSetClass, resetForm } from "../../utils/formUtils";

const labelStdClassName = "text-xl font-bold";
const labelInputContainerClassName = "flex flex-col items-start gap-2";
const inputClassName =
  "min-w-[270px] w-full border-2 border-zinc-300 text-zinc-500 rounded-md px-3 py-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent focus:shadow-md";

const initialsFormValues: FormValues = {
  name: "",
  legalID: "",
  email: "",
  eps: "",
  gitHubProfile: "",
  phone: "",
};

export interface IRegistrationFormProps {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsUserRegisteredOnDB: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegistrationForm = ({
  setUser,
  setIsUserRegisteredOnDB,
}: IRegistrationFormProps) => {
  const { address } = useContext(ContractContext) as IContractContext;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const ErrorButton = () => {
    return (
      <>
        <span className="text-center text-red-400">Something went wrong.</span>
        <button
          type="submit"
          className="hover:text-black py-1 hover:border-green-200 hover:shadow-none border-2 shadow-sm hover:bg-green-100 rounded-md bg-red-100 border-red-300 w-full transition-all mt-5 font-extrabold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <BiLoaderAlt className="animate-spin" />
          ) : (
            <span>Try again</span>
          )}
        </button>
      </>
    );
  };

  const handleSubmit = async (values: FormValues) => {
    const userObj: UserDto = {
      address,
      ...values,
      legalID: `${values.legalID}`,
      phone: `+57${values.phone}`,
    };

    setIsLoading(true);
    try {
      const apiRes = await saveUserToDB(userObj);
      setIsLoading(false);
      if (apiRes) {
        setIsError(false);
        setUser(apiRes.data);
        setIsUserRegisteredOnDB(true);
        resetForm(formik, initialsFormValues);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const formik = useFormik({
    initialValues: initialsFormValues,
    validationSchema: FormSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 w-full mt-5"
    >
      <div className={labelInputContainerClassName}>
        <LabelStd
          label="Llave pública"
          htmlFor="name"
          className={labelStdClassName}
        />
        <input
          disabled={true}
          value={address}
          type="text"
          name="address"
          id="address"
          className={inputClassName}
          spellCheck={false}
        />
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className={labelInputContainerClassName}>
        <LabelStd
          label="Nombre completo"
          htmlFor="name"
          className={labelStdClassName}
        />

        <input
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          type="text"
          name="name"
          id="name"
          placeholder="Alejandro Soto"
          className={checkStateAndSetClass(
            formik.touched.name,
            formik.errors.name,
            inputClassName
          )}
        />
        {formik.touched.name && formik.errors.name && (
          <InputErrorStd>{formik.errors.name}</InputErrorStd>
        )}
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className={labelInputContainerClassName}>
        <LabelStd
          label="Identificación"
          htmlFor="legalID"
          className={labelStdClassName}
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.legalID}
          onBlur={formik.handleBlur}
          type="number"
          name="legalID"
          id="legalID"
          placeholder="123456789"
          className={checkStateAndSetClass(
            formik.touched.legalID,
            formik.errors.legalID,
            inputClassName
          )}
        />
        {formik.touched.legalID && formik.errors.legalID && (
          <InputErrorStd>{formik.errors.legalID}</InputErrorStd>
        )}
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className={labelInputContainerClassName}>
        <LabelStd
          label="Correo"
          htmlFor="email"
          className={labelStdClassName}
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          type="email"
          name="email"
          id="email"
          placeholder="user@email.com"
          className={checkStateAndSetClass(
            formik.touched.email,
            formik.errors.email,
            inputClassName
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <InputErrorStd>{formik.errors.email}</InputErrorStd>
        )}
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className={labelInputContainerClassName}>
        <LabelStd label="EPS" htmlFor="eps" className={labelStdClassName} />
        <input
          onChange={formik.handleChange}
          value={formik.values.eps}
          onBlur={formik.handleBlur}
          type="text"
          name="eps"
          id="eps"
          placeholder="Sura"
          className={checkStateAndSetClass(
            formik.touched.eps,
            formik.errors.eps,
            inputClassName
          )}
        />
        {formik.touched.eps && formik.errors.eps && (
          <InputErrorStd>{formik.errors.eps}</InputErrorStd>
        )}
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className={labelInputContainerClassName}>
        <LabelStd
          label="Usuario de GitHub"
          htmlFor="gitHubProfile"
          className={labelStdClassName}
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.gitHubProfile}
          onBlur={formik.handleBlur}
          type="text"
          name="gitHubProfile"
          id="gitHubProfile"
          placeholder="Cocodrilette"
          className={checkStateAndSetClass(
            formik.touched.gitHubProfile,
            formik.errors.gitHubProfile,
            inputClassName
          )}
        />
        {formik.touched.gitHubProfile && formik.errors.gitHubProfile && (
          <InputErrorStd>{formik.errors.gitHubProfile}</InputErrorStd>
        )}
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className={labelInputContainerClassName}>
        <LabelStd
          label="Teléfono"
          htmlFor="phone"
          className={labelStdClassName}
        />
        <input
          onChange={formik.handleChange}
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          type="tel"
          name="phone"
          id="phone"
          placeholder="3123123123"
          className={checkStateAndSetClass(
            formik.touched.phone,
            formik.errors.phone,
            inputClassName
          )}
        />
        {formik.touched.phone && formik.errors.phone && (
          <InputErrorStd>{formik.errors.phone}</InputErrorStd>
        )}
      </div>

      {isError ? (
        <ErrorButton />
      ) : (
        <button
          disabled={formik.isSubmitting || isLoading}
          type="submit"
          className="hover:text-black py-1 hover:border-green-200 hover:shadow-none border-2 shadow-sm hover:bg-green-100 rounded-md border-zinc-300 w-full transition-all mt-5 font-extrabold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <BiLoaderAlt className="mx-auto animate-spin" />
          ) : (
            "Enviar"
          )}
        </button>
      )}
    </form>
  );
};
