interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div className="flex h-auto w-[456px] flex-col items-center gap-[30px] rounded-[40px] bg-white px-[40px] pt-[38px] pb-[34px] drop-shadow-lg">
      {children}
    </div>
  );
};

export default FormContainer;
