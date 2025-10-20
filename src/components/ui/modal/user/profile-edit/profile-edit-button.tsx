import { Edit } from "@/assets/icons";

const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute -right-[2px] -bottom-[5px] flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white p-2"
    >
      <Edit className="size-6 flex-shrink-0 text-slate-600" />
    </button>
  );
};

export default EditButton;
