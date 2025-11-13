import { AuthGuard } from "@/components/section";
import FormContainer from "@/components/section/auth/form-layout/form-container";
import FormHeader from "@/components/section/auth/form-layout/form-header";
import SignInForm from "@/components/section/auth/sign-in/sign-in-form";

const SignInPage = () => {
  return (
    <AuthGuard>
      <FormContainer className="tb:gap-[40px] gap-[24px]">
        <FormHeader />
        <SignInForm />
      </FormContainer>
    </AuthGuard>
  );
};

export default SignInPage;
