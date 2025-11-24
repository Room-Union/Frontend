import {
  FormProvider,
  useForm,
  type FieldValues,
  type UseFormProps,
} from "react-hook-form";

interface ReactHookFormProviderProps<T extends FieldValues> {
  children: React.ReactNode;
  options?: UseFormProps<T>;
}

function ReactHookFormProvider<T extends FieldValues>({
  children,
  options,
}: ReactHookFormProviderProps<T>) {
  const methods = useForm<T>(options);

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export default ReactHookFormProvider;
