interface ProgressProps {
  percent: number;
}

const Progress = ({ percent }: ProgressProps) => {
  return (
    <div className="bg-gray-neutral-200 tb:w-[142px] h-[5px] w-[101px] rounded-full">
      <div
        className="tb:max-w-[142px] h-[5px] max-w-[101px] rounded-full bg-gradient-to-r from-[#49a3fd] to-[#79c7ff]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default Progress;
