import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useSigner,
} from "wagmi";
import { useFormik } from "formik";
import { BiLoaderAlt } from "react-icons/bi";

import styles from "@/styles/Registration.module.css";
import { LabelStd } from "../common/LabelStd";
import { InputErrorStd } from "../common/InputErrorStd";
import { FormValues } from "../../../lib/formUtils";
import {
  ContractContext,
  IContractContext,
} from "../../hooks/RegistrationManagerContractContext";
import {
  checkStateAndSetClass,
  validate,
  resetForm,
} from "../../../lib/formUtils";
import { useRouter } from "next/router";

const labelStdClassName = "text-xl font-bold";
const labelInputContainerClassName = "flex flex-col items-center gap-2";
const inputClassName =
  "min-w-[250px] w-full border-2 border-zinc-300 text-zinc-500 rounded-md px-3 py-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent focus:shadow-md";

const initialsFormValues: FormValues = {
  name: "",
  legalID: "",
  email: "",
  eps: "",
};

export const RegistrationForm = () => {
  const router = useRouter();
  const { address, contract } = useContext(ContractContext) as IContractContext;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { data } = useSigner();

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);

    if (data) {
      const success = await contract.joinIn(data);

      if (success) {
        router.reload();
        setIsError(false);
        resetForm(formik, initialsFormValues);
      } else {
        setIsError(true);
        console.log("Something went wrong");
      }
    }

    setIsLoading(false);
  };

  const errorButton = () => {
    return (
      <button
        type="submit"
        className="w-full text-red-400 py-1.5 rounded-md font-bold text-xl"
      >
        {isLoading ? (
          <BiLoaderAlt className="animate-spin" />
        ) : (
          <span>Something went wrong. Try again.</span>
        )}
      </button>
    );
  };

  const formik = useFormik({
    initialValues: initialsFormValues,
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 w-full mt-5 text-zinc-400 "
    >
      <div className={labelInputContainerClassName}>
        <LabelStd
          label="Ethereum_Address"
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
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className={labelInputContainerClassName}>
        <LabelStd label="Name" htmlFor="name" className={labelStdClassName} />

        <input
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          type="text"
          name="name"
          id="name"
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
          label="Legal_ID"
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
          className={checkStateAndSetClass(
            formik.touched.legalID,
            formik.errors.legalID,
            inputClassName
          )}
          autoComplete="off"
        />
        {formik.touched.legalID && formik.errors.legalID && (
          <InputErrorStd>{formik.errors.legalID}</InputErrorStd>
        )}
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className={labelInputContainerClassName}>
        <LabelStd
          label="E_Mail"
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
          className={checkStateAndSetClass(
            formik.touched.email,
            formik.errors.email,
            inputClassName
          )}
          autoComplete="off"
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
          className={checkStateAndSetClass(
            formik.touched.eps,
            formik.errors.eps,
            inputClassName
          )}
          autoComplete="off"
        />
        {formik.touched.eps && formik.errors.eps && (
          <InputErrorStd>{formik.errors.eps}</InputErrorStd>
        )}
      </div>

      {isError ? (
        errorButton()
      ) : (
        <button
          disabled={formik.isSubmitting || isLoading}
          type="submit"
          className={`${styles.containerBlackBorderSM} mx-auto hover:text-black transition-all mt-5 font-extrabold disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <BiLoaderAlt className="mx-auto animate-spin" />
          ) : (
            "Send"
          )}
        </button>
      )}
    </form>
  );
};
