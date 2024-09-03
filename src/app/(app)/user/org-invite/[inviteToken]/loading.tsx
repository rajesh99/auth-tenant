import { Icons } from '@/components/Icons';

const Loading = () => {
  return (
    <div className="">
      <Icons.Spinner color="black" size={24} className="animate-spin" />
      <div>Please Wait while we setup your organization...</div>
    </div>
  );
};

export default Loading;
