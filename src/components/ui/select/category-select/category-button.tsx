interface CategoryButtonProps {
  icon: React.ReactNode;
  children: string;
}

const CategoryButton = ({ icon, children }: CategoryButtonProps) => {
  return (
    <div className="group text-gray-neutral-500 flex cursor-pointer items-center gap-2.5 rounded-[10px] p-2.5">
      {icon}
      <p className="typo-ui-md-medium group-hover:text-gray-neutral-700">
        {children}
      </p>
    </div>
  );
};

export default CategoryButton;
