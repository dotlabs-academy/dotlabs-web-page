import styles from "@/styles/Registration.module.css";
import { useAccount } from "wagmi";
import { useFormik } from "formik";
import { LabelStd } from "../formUtils/LabelStd";
import { InputErrorStd } from "../formUtils/InputErrorStd";
import { validateField, checkStateAndSetClass } from "../../../lib/formUtils";

const labelStdClassName = "text-xl font-bold";
const labelInputContainerClassName = "flex flex-col items-center gap-2";
const inputClassName =
  "min-w-[250px] w-full border-2 border-zinc-300 text-zinc-500 rounded-md px-3 py-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent focus:shadow-md";

const validate = (values: any) => {
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

export const RegistrationForm = () => {
  const { address } = useAccount();

  const formik = useFormik({
    initialValues: {
      name: "",
      legalID: "",
      email: "",
      eps: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
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
          autoComplete="off"
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

      <button
        disabled={formik.isSubmitting}
        type="submit"
        className={`${styles.containerBlackBorderSM} mx-auto hover:text-black transition-all mt-5 font-extrabold`}
      >
        Send
      </button>
    </form>
  );
};
