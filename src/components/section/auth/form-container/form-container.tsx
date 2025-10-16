interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div className="tb:px-[40px] tb:pt-[38px] tb:pb-[34px] tb:gap-[40px] flex h-auto w-[456px] flex-col items-center gap-[24px] rounded-[40px] bg-white px-[16px] py-[30px] drop-shadow-lg">
      {children}
    </div>
  );
};

export default FormContainer;
